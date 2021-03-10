class AddEthnicityToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :ethnicity, :string
  end
end
