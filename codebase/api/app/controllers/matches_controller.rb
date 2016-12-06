class MatchesController < ApplicationController
    def find_by_matcher
        @user = User.find_by_uid(params[:id])
        if !@user 
            render :json => { :success => false, :message => "Matcher not found" } 
            return
        end
        @match = Match.find_by_user1_id(@user.id)
        if !@match 
            render :json => { :success => false, :message => "No match found" } 
            return
        end
        if @match.user1.id == @user.id && @match.user2_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.user2.id == @user.id && @match.user1_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.canceled
            render :json => { :success => false, :message => "Match canceled" }
            return
        end
        render :json => {
            :success => true,
            :message => "Match found!",
            :match => @match.to_json
        }
    end
    
    def find_by_matchee
        @user = User.find_by_uid(params[:id])
        if !@user 
            render :json => { :success => false, :message => "Matchee not found" } 
            return
        end
        @match = Match.find_by_user2_id(@user.id)
        if !@match 
            render :json => { :success => false, :message => "No match found" } 
            return
        end
        if @match.user1.id == @user.id && @match.user2_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.user2.id == @user.id && @match.user1_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.canceled
            render :json => { :success => false, :message => "Match canceled" }
            return
        end
        render :json => {
            :success => true,
            :message => "Match found!",
            :match => @match.to_json
        }
    end
    
    def find_by_user
        @user = User.find_by_uid(params[:id])
        if !@user 
            render :json => { :success => false, :message => "User not found" } 
            return
        end
        @match = Match.find_by_user1_id(@user.id) ? Match.find_by_user1_id(@user.id) : nil
        @match = Match.find_by_user2_id(@user.id) ? Match.find_by_user2_id(@user.id) : @match
        if !@match 
            render :json => { :success => false, :message => "Match not found" } 
            return
        end
        if @match.user1.id == @user.id && @match.user2_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.user2.id == @user.id && @match.user1_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.canceled
            render :json => { :success => false, :message => "Match canceled" }
            return
        end
        render :json => {
            :success => true,
            :message => "Match found!",
            :match => @match.to_json
        }
    end
    
    def show
        @match = Match.find_by_id(params[:id])
        if !@match 
            render :json => { :success => false, :message => "Match not found" } 
            return
        end
        if @match.canceled
            render :json => { :success => false, :message => "Match canceled" }
            return
        end
        render :json => {
            :success => true,
            :message => "Match found!",
            :match => @match.to_json
        }
    end
    
    def accept_match
        @match = Match.find_by_id(params[:id])
        if !@match 
            render :json => { :success => false, :message => "Match not found" } 
            return
        end
        @user = User.find_by_uid(params[:user_id])
        if !@user 
            render :json => { :success => false, :message => "User not found" } 
            return
        end
        if @match.user1.id == @user.id && @match.user2_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.user2.id == @user.id && @match.user1_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        end
        if @match.user1 == @user 
            @match.user1_accepted = true
            @match.save
            render :json => { :success => true, :message => "Match accepted" } 
        elsif @match.user2 == @user
            @match.user2_accepted = true
            @match.save
            render :json => { :success => true, :message => "Match accepted" }
        else
            render :json => { :success => false, :message => "User is not a part of this match" }
        end
    end
    
    def cancel_match
        @match = Match.find_by_id(params[:id])
        if !@match 
            render :json => { :success => false, :message => "Match not found" } 
            return
        end
        @user = User.find_by_uid(params[:user_id])
        if !@user 
            render :json => { :success => false, :message => "User not found" } 
            return
        end
        if @match.user1.id == @user.id && @match.user2_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.user2.id == @user.id && @match.user1_canceled
            @match.destroy!
            render :json => { :success => false, :message => "Match canceled" }
            return
        elsif @match.canceled
            render :json => { :success => false, :message => "Match canceled" }
            return
        end
        if @match.user1 == @user
            @match.user1_canceled = true
            @match.save
            render :json => { :success => true, :message => "Match canceled" } 
        elsif @match.user2 == @user
            @match.user2_canceled = true
            @match.save
            render :json => { :success => true, :message => "Match canceled" }
        else
            render :json => { :success => false, :message => "User is not a part of this match" }
        end
    end
    
    def destroy
        @match = Match.find_by_id(params[:id])
        if !@match 
            render :json => { :success => false, :message => "Match not found" } 
            return
        end
        if !@match.destroy
            render :json => {
                :success => false,
                :message => "Destroy failed"
            }
            return
        end
        render :json => {
            :success => true,
            :message => "Destroy success!"
        }
    end
end
