class AddMatchIdsToUser < ActiveRecord::Migration
  def change
    add_column :users, :match_ids, :integer, array:true, default: []
  end
end
