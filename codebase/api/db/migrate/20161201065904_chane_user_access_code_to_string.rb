class ChaneUserAccessCodeToString < ActiveRecord::Migration
  def change
    change_column :users, :access_code, :string
  end
end
