require 'open-uri' 
require 'net/http'
require 'openssl'
require 'json'

class UsersController < ApplicationController
    def show
        user = User.find(params[:id]).to_json(
            except: [:password_digest, :created_at, :updated_at],
            include: [
                votes: {except: [:created_at, :updated_at, :user_id, :id]},
                representatives: {except: [:created_at, :updated_at]}
            ])

        render json: user
    end
    
    def login
        user = User.find_by(email: params[:email])
        if user.authenticate(params[:password])
            token = encode({user_id: user.id})
            dataPack = {
                userData: JSON.parse(user.to_json(
                    except: [:password_digest, :created_at, :updated_at],
                    include: [
                        votes: {except: [:created_at, :updated_at, :user_id, :id]},
                        representatives: {except: [:created_at, :updated_at]}
                    ])),
                token: token
            }
            render json: dataPack
        else
            render json: {
                error_message: "Incorrect email or password"
            }
        end
    end

    def token_check
        user = User.find(decode(request.headers["Authenticate"])["user_id"])
        
        if user
            render json: user.to_json(
                except: [:password_digest, :created_at, :updated_at],
                include: [
                    votes: {except: [:created_at, :updated_at, :user_id, :id]},
                    representatives: {except: [:created_at, :updated_at]}
                ])
        else
            render json: {
                error_message: "Invalid Token Detected"
            }
        end
    end

    def index
        users = User.all
        render json: users, except: [:password_digest]
    end

    def create
        if User.find_by(email: params[:user][:email])
            render json: {
                error_message: "Account with that email has already been created."
            }
        else
            user = User.new(user_params)
            if user.save
                #fetch civic data and create associated relationship models
                civic_data = fetchCivicData(user)
                civic_data["divisions"].each do |k, v|
                    rep = Representative.find_or_create_by(name: v["name"])
                    const = Constituent.create(representative: rep, user: user)
                end

                #prepare user data for render
                token = encode({user_id: user.id})
                dataPack = {
                    userData: JSON.parse(user.to_json(
                        except: [:password_digest, :created_at, :updated_at],
                        include: [
                            votes: {except: [:created_at, :updated_at, :user_id, :id]},
                            representatives: {except: [:created_at, :updated_at]}
                        ])),
                    token: token
                }

                #return user data to the frontend
                render json: dataPack
            end
        end
    end

    def update
        user = User.find(params[:id])
        
        if user.update(user_params)
            render json: user.to_json(
                except: [:password_digest, :created_at, :updated_at],
                include: [
                    votes: {except: [:created_at, :updated_at, :user_id, :id]},
                    representatives: {except: [:created_at, :updated_at]}
                ]
            )
        end
    end

    def destroy
        user = User.find(params[:id])      
        user.destroy
    end

    def rep_refresh
        user = User.find(params[:id])      
        user.constituents.destroy_all

        civic_data = fetchCivicData(user)
        civic_data["divisions"].each do |k, v|
            rep = Representative.find_or_create_by(name: v["name"])
            const = Constituent.create(representative: rep, user: user)
        end

        render json: user.to_json(
            except: [:password_digest, :created_at, :updated_at],
            include: [
                votes: {except: [:created_at, :updated_at, :user_id, :id]},
                representatives: {except: [:created_at, :updated_at]}
            ]
        )
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :password, :date_of_birth, :address, :city, :state, :zip_code, :gender, :party, :occupation)
    end

    def fetchCivicData(user)
        includeOffices = "false"
        address = user.address+" "+user.city+" "+user.state+" "+user.zip_code
        encoded_address = URI::escape(address)

        url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=#{encoded_address}&includeOffices=#{includeOffices}&key=#{AUTH_DETAILS[google_api_key]}"
        uri = URI.parse(url)
        response = Net::HTTP.get_response(uri)
        data = JSON.parse(response.body) 
        return data
    end

end



