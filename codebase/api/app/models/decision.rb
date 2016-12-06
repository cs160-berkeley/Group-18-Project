class Decision < ActiveRecord::Base
    belongs_to :user
    belongs_to :interest
    
    def to_json
        @interest = Interest.exists?(self.interest_id) ? Interest.find(self.interest_id) : nil
        return {
           :id => self.id,
           :user_id => self.user_id,
           :interest_id => self.interest_id,
           :decision_type => self.decision_type,
           :interest => @interest.to_json
       } 
    end
    
    def decision_type_value
        if self.decision_type == "like" then return 1 end
        if self.decision_type == "pass" then return 0 end
        if self.decision_type == "dislike" then return -1 end
    end
    
    def self.to_json_list(decision_list)
        json_out = []
        decision_list.each do |decision|
           json_out.push(decision.to_json)
        end
        return json_out
    end
end
