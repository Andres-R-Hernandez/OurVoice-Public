class CreatePolls < ActiveRecord::Migration[6.0]
  def change
    create_table :polls do |t|
      t.string :issue
      t.string :category

      t.timestamps
    end
  end
end
