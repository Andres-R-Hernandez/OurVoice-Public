class VotesController < ApplicationController
    def index
        votes = Vote.all
        render json: votes
    end
    
    def create
        vote = Vote.new(vote_params)

        if vote.save
            user = User.find(params[:user_id])
            render json: user.to_json(
                except: [:password_digest, :created_at, :updated_at],
                include: [
                    votes: {except: [:created_at, :updated_at, :user_id, :id]},
                    representatives: {except: [:created_at, :updated_at]}
                ])
        else
            render json: {
                error_message: "Hmm something went wrong. Please try again later."
            }
        end 
    end

    private

    def vote_params
        params.require(:vote).permit(:user_id, :polloption_id, :poll_id)
    end
end
