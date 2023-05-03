defmodule MovesWeb.PageController do
  use MovesWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
