class CreateDecisions < ActiveRecord::Migration
  def change
    create_table :decisions do |t|
      t.integer :user_id
      t.integer :interest_id
      t.string :decision_type

      t.timestamps null: false
    end
  end
end
