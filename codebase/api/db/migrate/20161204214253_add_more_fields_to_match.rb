class AddMoreFieldsToMatch < ActiveRecord::Migration
  def change
      add_column :matches, :user2_accepted, :boolean, default: false
      add_column :matches, :user2_canceled, :boolean, default: false
      add_column :matches, :meet_point_latitude, :decimal
      add_column :matches, :meet_point_longitude, :decimal
  end
end
