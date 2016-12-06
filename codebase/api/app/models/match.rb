class Match < ActiveRecord::Base
    belongs_to :user, :foreign_key => 'user1_id'
    belongs_to :user, :foreign_key => 'user2_id'
    
    def user1
        return User.find(self.user1_id)
    end
    
    def user2
        return User.find(self.user2_id)
    end
    
    def should_be_destroyed
        return self.user1_canceled && self.user2_canceled
    end
    
    def accepted
        return self.user1_accepted && self.user2_accepted
    end
    
    def canceled
        return self.user1_canceled || self.user2_canceled
    end
    
    def to_json
        return {
            :id => self.id,
            :user1 => self.user1.to_json,
            :user1_accepted => self.user1_accepted,
            :user1_canceled => self.user1_canceled,
            :user2 => self.user2.to_json,
            :user2_accepted => self.user2_accepted,
            :user2_canceled => self.user2_canceled,
            :meet_point_latitude => self.meet_point_latitude,
            :meet_point_longitude => self.meet_point_longitude,
            :user1_distance => Match.distance([self.meet_point_latitude, self.meet_point_longitude], [self.user1.latitude, self.user1.longitude]).floor,
            :user2_distance => Match.distance([self.meet_point_latitude, self.meet_point_longitude], [self.user2.latitude, self.user2.longitude]).floor,
            :canceled => self.canceled,
            :accepted => self.accepted,
        }
    end
    
    # Credit: http://stackoverflow.com/questions/12966638/how-to-calculate-the-distance-between-two-gps-coordinates-without-using-google-m
    def self.distance loc1, loc2
        rad_per_deg = Math::PI/180  # PI / 180
        rkm = 6371                  # Earth radius in kilometers
        rm = rkm * 1000             # Radius in meters
    
        dlat_rad = (loc2[0] - loc1[0]) * rad_per_deg  # Delta, converted to rad
        dlon_rad = (loc2[1] - loc1[1]) * rad_per_deg
    
        lat1_rad, lon1_rad = loc1.map {|i| i * rad_per_deg }
        lat2_rad, lon2_rad = loc2.map {|i| i * rad_per_deg }
    
        a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
        c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
    
        rm * c * 3.28084 # Delta in meters -> feet
    end
end
