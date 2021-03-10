class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :poll
  belongs_to :polloption
end
