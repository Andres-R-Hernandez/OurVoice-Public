class CreateConstituents < ActiveRecord::Migration[6.0]
  def change
    create_table :constituents do |t|
      t.references :user, null: false, foreign_key: true
      t.references :representative, null: false, foreign_key: true

      t.timestamps
    end
  end
end
