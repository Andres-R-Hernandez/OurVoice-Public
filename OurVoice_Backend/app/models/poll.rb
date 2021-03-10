class Poll < ApplicationRecord
    has_many :votes
	has_many :users, through: :votes
	has_many :rpjoiners
	has_many :representatives, through: :rpjoiners
	has_many :polloptions

	accepts_nested_attributes_for :polloptions, reject_if: proc { |attributes| attributes['description'].blank? }
	accepts_nested_attributes_for :rpjoiners
end
