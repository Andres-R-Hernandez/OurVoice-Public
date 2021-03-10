class ConstituentsController < ApplicationController
    def index
        constituents = Constituent.all
        render json: constituents
    end
    
    def show
        constituent = Constituent.find(params[:id])
        render json: constituent
    end
end
