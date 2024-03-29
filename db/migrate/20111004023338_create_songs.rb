class CreateSongs < ActiveRecord::Migration
  def self.up
    create_table :songs do |t|
      t.integer :playlist_id
      t.string :name
      t.string :yt_url
      t.string :contributor
      t.string :yt_id

      t.timestamps
    end
  end

  def self.down
    drop_table :songs
  end
end
