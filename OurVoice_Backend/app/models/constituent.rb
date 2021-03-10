class Constituent < ApplicationRecord
  belongs_to :user
  belongs_to :representative
end
