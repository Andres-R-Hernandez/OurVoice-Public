class CreatePolloptions < ActiveRecord::Migration[6.0]
  def change
    create_table :polloptions do |t|
      t.string :description
      t.references :poll, null: false, foreign_key: true

      t.timestamps
    end
  end
end
