class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    post = Post.create(content: params[:content])
    # 新たに投稿されたメモの内容を変数postに格納
    render json:{ post: post }
    #上記で定義した変数postの値を、postというキーとセットでJavaScriptに送信
  end
end
