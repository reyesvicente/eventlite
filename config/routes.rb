Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'events#index'

  resources :events
end
