class User < ApplicationRecord
	has_secure_password

    has_many :votes, dependent: :destroy
	has_many :polls, through: :votes
	has_many :constituents, dependent: :destroy
	has_many :representatives, through: :constituents

	validates :name, :email, :address, :city, :state, :zip_code, :password, presence: true
	validates :email, uniqueness: true
end
