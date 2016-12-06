class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :description
      t.string :url
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps null: false
    end
  end
end
