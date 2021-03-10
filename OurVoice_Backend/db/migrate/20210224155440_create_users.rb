class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.date :date_of_birth
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.string :gender
      t.string :party
      t.string :occupation

      t.timestamps
    end
  end
end
