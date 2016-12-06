class SessionsController < ApplicationController
  
  def success
    @user = User.find(params[:id])
    @access_code = ('0' * (6 - @user.access_code.to_s.length)).to_s + @user.access_code.to_s
    render :success
  end
  
  def kinoma_login
    access_code = params[:access_code]
    if !User.find_by_access_code(access_code)
        render :json => {
            "success" => false,
            "message" => "Invalid access code"
        }
    else
        @user = User.find_by_access_code(access_code)
        @user.access_code = ""
        @user.save
        render :json => {
            "success" => true,
            "message" => "User found!",
            "uid" => @user.uid
        }
    end
  end
  
  def login
    rand_code = rand(999999)
    while User.find_by_access_code(rand_code) != nil || rand_code < 99999 do
      rand_code = rand(999999)
    end
    if params[:user]
      @user = User.find(params[:user])
      @user.update_credentials(params[:credentials])
      @user.access_code = rand_code
      @user.save
      redirect_to success_path(@user.id)
    else
      @new_user = {
        :uid => params[:auth][:uid],
        :name => params[:auth][:info][:first_name] + ' ' + params[:auth][:info][:last_name],
        :url => params[:auth][:info][:image] + "?width=200&height=200",
        :email => params[:auth][:info][:email],
        :gender => params[:auth][:extra][:raw_info] != nil ? params[:auth][:extra][:raw_info][:gender] : "other",
        :access_code => ('0' * (6 - rand_code.to_s.length)).to_s + rand_code.to_s,
        :latitude => rand(70603 - 68621) * 0.000001 + 37.868621,
        :longitude => (rand(8932 - 7333) * 0.000001 + 122.267333) * -1,
      }
      @new_user = User.new(@new_user)
      @new_user.update_credentials(params[:auth][:credentials])
      @new_user.save
      redirect_to success_path(@new_user.id)
    end   
  end

  def handle_auth 
    uid = request.env["omniauth.auth"][:uid]
    @user = User.find_by_uid(uid)
    redirect_to login_path(:user => @user, :auth => request.env["omniauth.auth"], :credentials => request.env["omniauth.auth"][:credentials])
  end
    
end
