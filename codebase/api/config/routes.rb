Rails.application.routes.draw do
  
  devise_for :users
  resources :users, only: [:show, :update, :destroy, :create]
  get 'users/:id/interests', to: "users#interests"
  get 'users/:id/decisions', to: "users#decisions"
  get 'users/:id/match', to: "users#match"
  
  get 'interests/all', to: "interests#all"
  resources :interests, only: [:show, :update, :destroy, :create, :new]
  
  resources :decisions, only: [:show, :update, :destroy, :create]
  
  resources :sessions, only: [:show]
  
  ## Match Routes ##
  get 'matches/:id', to: "matches#show"
  get 'matches/find_by_user/:id', to: "matches#find_by_user"
  get 'matches/find_by_matcher/:id', to: "matches#find_by_matcher"
  get 'matches/find_by_matchee/:id', to: "matches#find_by_matchee"
  get 'matches/:id/accept/:user_id', to: "matches#accept_match"
  get 'matches/:id/cancel/:user_id', to: "matches#cancel_match"
  #get 'matches/:id/destroy', to: "matches#destroy"
  
  ## Session Routes ##
  get 'auth/:provider/callback', to: 'sessions#handle_auth', as: 'auth_success'
  get 'auth/failure', to: 'sessions#handle_failure', as: 'auth_failure'
  get 'login', to: 'sessions#login', as: 'login'
  get 'success/:id', to: 'sessions#success', as: 'success'
  get 'kinoma_login/', to: 'sessions#kinoma_login', as: 'kinoma_login'
  
  root to: "application#index"
  
end
