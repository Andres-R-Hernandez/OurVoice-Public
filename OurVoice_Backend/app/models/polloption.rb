class Polloption < ApplicationRecord
  belongs_to :poll
  has_many :votes
end
