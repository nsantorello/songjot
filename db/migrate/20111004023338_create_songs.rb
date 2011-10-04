class CreateSongs < ActiveRecord::Migration
  def self.up
    create_table :songs do |t|
      t.string :name
      t.string :yt_url
      t.string :contributor
      t.string :yt_id
      t.int :playlist_id

      t.timestamps
    end
  end

  def self.down
    drop_table :songs
  end
end
