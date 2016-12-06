class AddAuthExpiresAtToUsers < ActiveRecord::Migration
  def change
    add_column :users, :auth_expires_at, :string
  end
end
