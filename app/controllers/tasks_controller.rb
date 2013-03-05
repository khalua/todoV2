class TasksController < ApplicationController
  before_filter :ensure_logged_in

  def index
    @tasks = @auth.tasks
  end

  def create
    task = Task.create(params[:task])
    @auth.tasks << task
    render :json => [task.as_json(:include => :priority)]
  end

  def update
  end
end