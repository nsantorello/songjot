require 'gdata'
require 'json'
require 'date'

class UpdateController < ApplicationController
  def UpdateController::periodic_update
    playlist_prefix = 'Subjot Song of the Day ('
    playlist_suffix = ')'
    
    # Get latest jots
    update = `curl "https://subjot.com/api/v1/jots/public.json?subject=song%20of%20the%20day&oauth_token=U4yInU8gvY7WxGB6aONzeoC1tX7zQFdSP3udG4oi"`
    dict = JSON.parse(update)
  
    # Connect to YouTube
    client = GData::Client::YouTube.new
    client.clientlogin('songjot@gmail.com', 'fratu8U-etr-gEy#')
    api_secret = "AI39si4nqETTEDv3fAxfIWzgkDW2jVn3S3I0eGf9ka3Urbfc5lgBpAHOih6w1ixUF_5LnA1hkIKvPasCmLyhmM9Ly2teehWLCA"
  
    # Create today's playlist just to be sure
    playlist = Playlist.where(:name => Date.today.to_s).first
    if playlist == nil
      # Create playlist on YouTube and in DB since it doesn't exist
      playlist_title = playlist_prefix + postdate + playlist_suffix
      str = '<?xml version="1.0" encoding="UTF-8"?>
      <entry xmlns="http://www.w3.org/2005/Atom" 
      xmlns:yt="http://gdata.youtube.com/schemas/2007">        
        <title type="text">' + playlist_title + '</title>
        <summary>An aggregate of YouTube songs posted to the "song of the day" subject on subjot.com</summary>
      </entry>'
      result = client.post("https://gdata.youtube.com/feeds/api/users/default/playlists?key=#{api_secret}", str)
      playlistrgx = /<yt:playlistId>(.{16})<\/yt:playlistId>/.match(result.body)
      if playlistrgx != nil
        playlist_id = playlistrgx[1]
        playlist = Playlist.create({:name => Date.today.to_s, :yt_id => playlist_id})
        playlist.save!
      end
    end
  
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
        
        postdate = Date.parse(j["created_at"]).to_s
        
        # Does playlist already exist?  If not, create it in DB and on YouTube
        playlist = Playlist.where(:name => postdate).first
        playlist_id = ''
        if playlist == nil
          # Create playlist on YouTube and in DB since it doesn't exist
          playlist_title = playlist_prefix + postdate + playlist_suffix
          str = '<?xml version="1.0" encoding="UTF-8"?>
          <entry xmlns="http://www.w3.org/2005/Atom" 
          xmlns:yt="http://gdata.youtube.com/schemas/2007">        
            <title type="text">' + playlist_title + '</title>
            <summary>An aggregate of YouTube songs posted to the "song of the day" subject on subjot.com</summary>
          </entry>'
          result = client.post("https://gdata.youtube.com/feeds/api/users/default/playlists?key=#{api_secret}", str)
          playlistrgx = /<yt:playlistId>(.{16})<\/yt:playlistId>/.match(result.body)
          if playlistrgx != nil
            playlist_id = playlistrgx[1]
            playlist = Playlist.create({:name => postdate, :yt_id => playlist_id})
            playlist.save!
          end
        else
          playlist_id = playlist.yt_id
        end
      
        # If the video is not already in today's playlist
        if playlist.songs.none?{|s|s.yt_id == video_id}
          # Add it!
          song = Song.create ({:yt_id => video_id, :playlist_id => playlist.id})
          str = '<?xml version="1.0" encoding="UTF-8"?>
          <entry xmlns="http://www.w3.org/2005/Atom" 
          xmlns:yt="http://gdata.youtube.com/schemas/2007">
            <id>' + video_id + '</id>
          </entry>'

          result = client.post("https://gdata.youtube.com/feeds/api/playlists/#{playlist_id}?key=#{api_secret}", str)
          playlist.save!
        end
      end
    end
  end
end
