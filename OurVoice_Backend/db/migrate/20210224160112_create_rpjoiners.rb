class CreateRpjoiners < ActiveRecord::Migration[6.0]
  def change
    create_table :rpjoiners do |t|
      t.references :poll, null: false, foreign_key: true
      t.references :representative, null: false, foreign_key: true

      t.timestamps
    end
  end
end
