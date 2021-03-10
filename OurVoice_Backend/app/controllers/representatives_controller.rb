class RepresentativesController < ApplicationController
    def index
        reps = Representative.all

        render json: reps
    end
end
