const {Socket} = require("phoenix-channels")
const cluster = require("cluster")

if(cluster.isMaster) {
  for(let i = 0; i < 40; i++) {
    cluster.fork()
  }
} else {
  let socket  = new Socket("ws://localhost:4000/socket")

  socket.connect()

  let channel = socket.channel("bestmove:lobby", {})
  channel.join()

  channel.on("new_move", payload => {
    console.log({payload})
    channel.push("registered", {client: process.pid})
  })
}
