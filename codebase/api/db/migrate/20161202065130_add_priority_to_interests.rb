class AddPriorityToInterests < ActiveRecord::Migration
  def change
    add_column :interests, :priority, :integer, :limit => 10
  end
end
