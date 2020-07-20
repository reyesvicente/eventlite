class EventsController < ApplicationController
  def index
    @events = Event.order('start_datetime ASC')
    render json: @events
  end

  def create
    @event = current_user.events.new(event_params)
    if @event.save
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def show
    @event = Event.find(params[:id])
    puts @event.as_json
    render json: @event.as_json(except: :user_id, include: {user: {only: [:name, :nickname, :image]}})
  end

  private
  def event_params
    params.require(:event).permit(:title, :start_datetime, :location)
  end
end
