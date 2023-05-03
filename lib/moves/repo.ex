defmodule Moves.Repo do
  use Ecto.Repo,
    otp_app: :moves,
    adapter: Ecto.Adapters.Postgres
end
