class EditMatchIds < ActiveRecord::Migration
  def change
    rename_column :users, :match_ids, :match_ids_arr
  end
end
