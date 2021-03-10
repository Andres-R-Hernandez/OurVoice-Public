class Representative < ApplicationRecord
    has_many :constituents
	has_many :users, through: :constituents
	has_many :rpjoiners
	has_many :polls, through: :rpjoiners
end
