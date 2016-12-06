class AddFieldsToMatch < ActiveRecord::Migration
  def change
      add_column :matches, :user1_id, :integer, :limit => 8
      add_column :matches, :user1_accepted, :boolean, default: false
      add_column :matches, :user1_canceled, :boolean, default: false
      add_column :matches, :user2_id, :integer, :limit => 8
  end
end
