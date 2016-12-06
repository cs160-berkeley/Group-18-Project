class ChangeMatchIdsToUser < ActiveRecord::Migration
  def change
    change_column :users, :match_ids, :text, default: "[]"
  end
end
