class InterestsController < ApplicationController
    
    protect_from_forgery with: :null_session
    
    def new
        render :new
    end
    
    def all
        output = ""
        Interest.all.each do |interest|
            output = output + "<br><br>" + interest.name + ",    priority: " + interest.priority.to_s
        end
        render :text => output
    end
    
    def create
        new_params = interest_params
        new_params[:priority] = interest_params[:priority] ? interest_params[:priority] : 1000
        @interest = Interest.new(new_params)
        
        if @interest.save
            render :json => { "success" => true, "message" => "Create successful" }
        else
            render :json => { "success" => false, "message" => "Create unsuccessful" }
        end
    end
    
    def update
        if Interest.update(params[:id], interest_params)
            render :json => { "success" => true, "message" => "Update successful" }
        else
            render :json => { "success" => false, "message" => "Update unsuccessful" }
        end
    end
    
    def destroy
        interest_id = params[:id]
        @interest = Interest.find(interest_id)
        if @interest.destroy
            render :json => { "success" => true, "message" => "Destroy successful" }
        else
            render :json => { "success" => false, "message" => "Destroy unsuccessful" }
        end
    end
    
    def show
        interest_id = params[:id]
        if !Interest.exists? interest_id
            render :json => {
                "success" => false,
                "message" => "Interest Not Found"
            }
        else
            @interests = Interest.find(interest_id)
            render :json => {
                "success" => true,
                "message" => "Interest Found",
                "interest" => @interests.to_json
            }
        end
    end
    
    private

    def interest_params
        params.require(:interest).permit(:name, :url, :weight, :priority)
    end
    
end