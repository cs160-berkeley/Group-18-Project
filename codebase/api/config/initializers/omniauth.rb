Rails.application.config.middleware.use OmniAuth::Builder do
    
    provider :facebook, '347078385647152', '34137d8c91ac71331708983edbf3f9dd', {:info_fields => 'email,first_name,last_name,location,gender'}

end