class UpdateMatchIdsToUser < ActiveRecord::Migration
  def change
      change_column :users, :match_ids, :text, array:true, default: []
  end
end
