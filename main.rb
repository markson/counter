require 'sinatra/base'
require 'haml'
require 'pry'

class Counter < Sinatra::Base
	set :public_folder, File.dirname(__FILE__) + '/static'
	get '/' do
		haml :index
	end


	get '/count/1' do
		@count = '' 
		File.open('data/count.csv')	do |f|
			@count = f.read.chop
		end
		@count
	end

	put '/count/1' do
		count = params[:count]
		File.open('data/count.csv', 'w') do |f|
			f.puts count
		end
		'True'
	end
	run!
end
