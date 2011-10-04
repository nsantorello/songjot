class AwesomeController < ApplicationController
  def index
    @playlists = Playlist.all
    respond_to do |format|
      format.html # index.html.erb
    end
  end
end