import { Socket } from "phoenix";
import React, { useEffect, useState } from 'react';

// to run in iex -S mix phx.server: MovesWeb.Endpoint.broadcast("bestmove:lobby", "new_move", %{message: "mesadss"})

const App = () => {
  // connect to the channel via our hook
  // the channel name is defined by the server

  const [activeMessages, setActiveMessages] = useState([]);

  // listening for messages from the channel
  useEffect(() => {
    const socket = new Socket("ws://localhost:4000/socket")
    socket.connect()

    const channel = socket.channel("bestmove:lobby", {})
    channel.join()

    channel.on("new_move", payload => {
      // next rerenders everything twice during development mode
      setActiveMessages((activeMessages) => [payload, ...activeMessages]);
      channel.push("registered", {client: "process.pid"})
    })
  }, []);

  return (
    <div>
      {activeMessages?.map((message, index) => (
          <div key={index}>
            <p>{JSON.stringify(message)}</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;