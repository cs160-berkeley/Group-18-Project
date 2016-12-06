class UpdateAuthLimitToUsers < ActiveRecord::Migration
  def change
    change_column :users, :uid, :integer, :limit => 10
  end
end
