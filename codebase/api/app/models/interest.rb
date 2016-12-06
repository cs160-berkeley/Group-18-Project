class Interest < ActiveRecord::Base
    has_many :decisions
    has_many :users, :through => :decisions
    
    def to_json 
        return {
            :id => self.id,
            :name => self.name,
            :url => self.url,
            :weight => self.weight,
        }  
    end
    
    def self.list_to_json(interest_list)
        return interest_list.each.map { |interest| interest.to_json }
    end
end
