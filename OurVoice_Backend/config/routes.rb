Rails.application.routes.draw do
  resources :votes
  resources :polloptions
  resources :rpjoiners
  resources :constituents
  resources :representatives
  #polls
  get '/pollRepData/:id', to: 'polls#vote_data'
  get '/polls', to: 'polls#index'
  get '/user_polls/:id', to: 'polls#user_polls'
  post '/polls', to: 'polls#create'
  #users
  resources :users
  post '/login', to: 'users#login'
  get '/check', to: 'users#token_check'
  get '/rep_refresh/:id', to: 'users#rep_refresh'
end
