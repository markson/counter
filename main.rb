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
		count = 0
		File.open('data/count.csv') do |f|
			count = f.read.chop.to_i
		end
		command = params[:command]
		if command == 'add'
			count += 1
		elsif command == 'minus'
			count -= 1
		end
		File.open('data/count.csv', 'w') do |f|
			f.puts count
		end
		count.to_s
	end
	run!
end
