class DecisionsController < ApplicationController
    
    protect_from_forgery with: :null_session
    
    def create
        if !decision_params[:user_uid] or !User.find_by_uid(decision_params[:user_uid])
            render :json => {
                "success" => false,
                "message" => "User Not Inputted or Not Found"
            }
            return
        end
        if !decision_params[:interest_id] or !Interest.exists? decision_params[:interest_id]
            render :json => {
                "success" => false,
                "message" => "Interest Not Inputted or Not Found"
            }
            return
        end
        new_params = decision_params
        new_params[:user_id] = User.find_by_uid(decision_params[:user_uid]).id
        new_params.delete(:user_uid)
        @decision = Decision.new(new_params)
        if @decision.save
            render :json => { "success" => true, "message" => "Create successful" }
        else
            render :json => { "success" => false, "message" => "Create unsuccessful" }
        end
    end
    
    def update
        if !Decision.find(params[:id])
            render :json => {
                "success" => false,
                "message" => "Decision Not Found"
            }
            return
        end
        if Decision.update(params[:id], decision_params)
            render :json => { "success" => true, "message" => "Update successful" }
        else
            render :json => { "success" => false, "message" => "Update unsuccessful" }
        end
    end
    
    def destroy
        decision_id = params[:id]
        @decision = Decision.find(decision_id)
        if @decision.destroy
            render :json => { "success" => true, "message" => "Destroy successful" }
        else
            render :json => { "success" => false, "message" => "Destroy unsuccessful" }
        end
    end
    
    def show
        decision_id = params[:id]
        if !Decision.exists? decision_id
            render :json => {
                "success" => false,
                "message" => "Decision Not Found"
            }
        else
            @decision = Decision.find(decision_id)
            render :json => {
                "success" => true,
                "message" => "Decision Found",
                "decision" => @decision.to_json
            }
        end
    end
    
    private
    
    def decision_params
        params.require(:decision).permit(:user_uid, :interest_id, :decision_type)
    end
end