class PollsController < ApplicationController

    def index
        polls = Poll.all

        render json: polls.to_json(
            except: [:updated_at],
            include: [
                polloptions: {except: [:created_at, :updated_at, :poll_id]},
                votes: {except: [:created_at, :updated_at, :user_id, :id, :poll_id]},
                representatives: {except: [:created_at, :updated_at]}
            ]
        )
    end

    def user_polls
        user = User.find(params[:id])
        user_reps = user.representatives
        polls = Poll.all

        user_polls = polls.select{|poll|poll.representatives.any?{|rep|user_reps.any?{|user_rep|user_rep==rep}}}

        if user_polls
            render json: user_polls.to_json(
                except: [:updated_at],
                include: [
                    polloptions: {except: [:created_at, :updated_at, :poll_id]},
                    votes: {except: [:created_at, :updated_at, :user_id, :id, :poll_id]},
                    representatives: {except: [:created_at, :updated_at]}
                ]
            )
        end
    end

    def vote_data
        #vote data needs to contain objects with vote data based on representatives
        poll = Poll.find(params[:id])
        options = poll.polloptions
        votes = poll.votes
        poll_reps = poll.representatives
        poll_voters = votes.map{|vote|vote.user}

        final = []

        poll_reps.each do |poll_rep|
            rep_voters = poll_voters.select{|voter|voter.representatives.any?{|user_rep|user_rep.id==poll_rep.id}}
            total = rep_voters.count

            # option_totals = options.each_with_object({}) do |option,hash|
            #     option_votes = votes.select{|vote|vote.polloption_id==option.id}
            #     hash[option.description] = option_votes.count{|vote|rep_voters.any?{|voter|voter.id==vote.user_id}}
            # end

            option_totals = options.map do |option,hash|
                option_votes = votes.select{|vote|vote.polloption_id==option.id}
                option_votes.count{|vote|rep_voters.any?{|voter|voter.id==vote.user_id}}
            end

            new_hash = {
                rep_name: poll_rep.name,
                total_count: total,
                option_totals: option_totals,
            }

            final.push(new_hash)
        end
        
        render json: final
        #[{rep_name: xxx, {option1: count,...}, total_count: xxx}, {}, {}]
    end

    def create
        poll = Poll.create(poll_params)

        render json: poll
    end

    private

    def poll_params
        params.require(:poll).permit(:issue, :category, polloptions_attributes: [:description], rpjoiners_attributes: [:representative_id])
    end
end
