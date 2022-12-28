const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
// const { user } = require("../src/component/Join/Join.js");
const app = express();
const port = 4500 || process.env.PORT;

const users = [{}];

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello detective its working now");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");
  socket.on("Joined", ({ user }) => {
    //  on means data receive--user destructring and receiving
    users[socket.id] = user; //data from chat user
    console.log(`${user} has joined`);
    socket.broadcast.emit("userJoined", {user: "Admin",message: `${users[socket.id]} has joined`}); // broadcast means khud ko  chhod ke dusre users ko
    socket.emit("welcome", {user: "Admin",message: `Welcome to the chat,${users[socket.id]}`});
  })

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  })

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {user: "Admin",message: `${users[socket.id]} has left`});
    console.log("User left");
  })
});
server.listen(port, () => {
  console.log(`server is running on  http://localhost:${port}`);
});
