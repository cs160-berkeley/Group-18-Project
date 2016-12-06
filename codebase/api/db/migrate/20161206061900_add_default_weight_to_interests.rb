class AddDefaultWeightToInterests < ActiveRecord::Migration
  def change
    change_column :interests, :weight, :decimal, :default => 1
  end
end
