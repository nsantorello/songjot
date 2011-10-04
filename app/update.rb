require 'gdata'
require 'json'
require 'date'

class TimelyUpdate < ActiveRecord::Base
  # Get latest jots
  update = `curl "https://subjot.com/api/v1/jots/search.json?search=song%20of%20the%20day&oauth_token=U4yInU8gvY7WxGB6aONzeoC1tX7zQFdSP3udG4oi"`
  dict = JSON.parse(update)
  
  # Connect to YouTube
  client = GData::Client::YouTube.new
  client.clientlogin('nsantorello@gmail.com', ' S@NDont3hbi@@TCH!')
  api_secret = "AI39si4nqETTEDv3fAxfIWzgkDW2jVn3S3I0eGf9ka3Urbfc5lgBpAHOih6w1ixUF_5LnA1hkIKvPasCmLyhmM9Ly2teehWLCA"
  
  # Get today's date as YYYY-MM-DD
  today = Date.today.to_s
  
  # Does playlist already exist?  If not, create it in DB and on YouTube
  playlist = Playlist.find_or_create_by_name(today)
  
  # Loop through each jot
  dict["jots"].each do |j|
    # Only grab jots that have "song of the day" as the subject
    if j["subject"]["name"] == "song of the day"
      # Get the ID of the linked YouTube video
      content = j["content"]
      surlrgx = /(youtu.be\/)(.{11})/.match content
      lurlrgx = /(youtube.com\/watch\?v=)(.{11})/.match content
      video_id = ''
      if surlrgx != nil
        video_id = surlrgx[2]
      elsif lurlrgx != nil
        video_id = lurlrgx[2]
      else
        next
      end
      
      # If the video is not already in today's playlist
      if Song.where(:yt_id => video_id).where(:playlist_id => playlist.id).first == nil
        # Add it!
        song = Song.create ({:yt_id => video_id, :playlist_id => playlist.id})
        str = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
        <entry xmlns=\"http://www.w3.org/2005/Atom\"
            xmlns:yt=\"http://gdata.youtube.com/schemas/2007\">
          <id>#{video_id}</id>
        </entry>"

        result = client.post("https://gdata.youtube.com/feeds/api/playlists/83C0347A5ADFF63B?key=#{api_secret}", str)
        playlist.save
      end
    end
  end
end
