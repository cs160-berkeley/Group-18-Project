class User < ActiveRecord::Base
  has_many :decisions
  has_many :interests, :through => :decisions
  has_many :matches
  
  before_create :generate_authentication_token!
  
  def update_credentials(credentials)
    self.auth_token = credentials[:token]
    self.auth_expires_at = Time.at(credentials[:expires_at].to_i)
    self.save 
  end
  
  def match_ids_as_array
    if self.match_ids_arr == nil then return [] end
    JSON.parse self.match_ids_arr
  end
  
  def add_new_match(match_id)
    match_ids = JSON.parse self.match_ids_arr
    match_ids.push(match_id)
    self.match_ids_arr = match_ids.to_json
    self.save
  end
    
  def generate_authentication_token!
    begin
      self.auth_token = Devise.friendly_token
    end while self.class.exists?(auth_token: auth_token)
  end
  
  def available_interests
    user_interest_ids = self.interests.map { |interest| interest.id }
    if (user_interest_ids.length > 0)
      return Interest.list_to_json(Interest.all.where("id NOT IN (?)", user_interest_ids).order("priority ASC"))
    else
      return Interest.list_to_json(Interest.all.order("priority ASC"))
    end
  end
  
  def similarity(user)
    (self.interests | user.interests).map { |i| 
      self_value = self.decisions[i.id] == nil ? 0 : self.decisions[i.id].decision_type_value
      user_value = user.decisions[i.id] == nil ? 0 : user.decisions[i.id].decision_type_value
      (i.weight * self_value * user_value)
    }.inject(0, :+)
  end

  def find_match(threshold=0, radius=500)
    users = User.all
      .select {|u| (!self.match_ids_as_array.include? u.id) && (u.id != self.id)}
      .select {|u| Match.distance([self.latitude, self.longitude], [u.latitude, u.longitude]) < radius}
      .select {|u| self.similarity(u) > threshold}
      .sort   {|u, v| similarity.call(v) <=> similarity.call(u)}
      
    User.all
      .select {|u| (!self.match_ids_as_array.include? u.id) && (u.id != self.id)}

    if users.empty? # || self.match_ids_as_array.empty?
      return nil
    else
      user = users[0]
      self.add_new_match(user.id)
      user.add_new_match(self.id)
      match = Match.new
      match.user1_id = self.id
      match.user2_id = user.id
      match.meet_point_latitude = (self.latitude + user.latitude) / 2
      match.meet_point_longitude = (self.longitude + user.longitude) / 2
      match.save
      return match.to_json
    end
  end
  
  def to_json
    return {
      :id => self.id,
      :name => self.name,
      :email => self.email,
      :description => self.description,
      :url => self.url,
      :uid => self.uid,
      :latitude => self.latitude,
      :longitude => self.longitude,
    }
  end
  
end
