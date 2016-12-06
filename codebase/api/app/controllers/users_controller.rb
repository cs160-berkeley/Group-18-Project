class UsersController < ApplicationController
    
    protect_from_forgery with: :null_session
    
    def create
        @user = User.new(user_params)
        if @user.save
            render :json => { "success" => true, "message" => "User created successful" }
        else
            render :json => { "success" => false, "message" => "User created unsuccessful" }
        end
    end
    
    def update
        user_id = User.find_by_uid(params[:id])
        if User.update(user_id, user_params)
            render :json => { "success" => true, "message" => "Update successful" }
        else
            render :json => { "success" => false, "message" => "Update unsuccessful" }
        end
    end
    
    def destroy
        user_id = params[:id]
        @user = User.find(user_id)
        if @user.destroy
            render :json => { "success" => true, "message" => "Destroy successful" }
        else
            render :json => { "success" => false, "message" => "Destroy unsuccessful" }
        end
    end
    
    def show
        user_uid = params[:id]
        if !User.find_by_uid(user_uid)
            render :json => {
                "success" => false,
                "message" => "User Not Found"
            }
        else
            @user = User.find_by_uid(user_uid)
            render :json => {
                "success" => true,
                "message" => "User Found",
                "user" => @user.to_json
            }
        end
    end
    
    # Gets all the available interests for a given user
    def interests
        user_uid = params[:id]
        if !User.find_by_uid(user_uid)
            render :json => {
                "success" => false,
                "message" => "User Not Found"
            }
        else
            @user = User.find_by_uid(user_uid)
            render :json => {
                "success" => true,
                "message" => "User's Interests Found",
                "interests" => @user.available_interests
            }
        end
    end
    
    # Gets all the decisions for a given user
    def decisions
        user_uid = params[:id]
        if !User.find_by_uid(user_uid)
            render :json => {
                "success" => false,
                "message" => "User Not Found"
            }
        else
            
            @user = User.find_by_uid(user_uid)
            render :json => {
                "success" => true,
                "message" => "User's Decisions Found",
                "decisions" => Decision.to_json_list(@user.decisions)
            }
        end
    end
    
    def match
        user_uid = params[:id]
        if !User.find_by_uid(user_uid)
            render :json => {
                "success" => false,
                "message" => "User Not Found"
            }
        else
            @user = User.find_by_uid(user_uid)
            match = @user.find_match
            if match == nil
                render :json => {
                    "success" => true,
                    "message" => "Match Not Found",
                }
            else
                render :json => {
                    "success" => true,
                    "message" => "Match Found",
                    "match" => match
                }
            end
        end
    end
    
    private

    def user_params
        params.require(:user).permit(:name, :url, :description, :latitude, :longitude, :email)
    end
    
end