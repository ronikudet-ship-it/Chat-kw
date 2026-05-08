const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("new user", (username) => {
    socket.username = username;
    io.emit("chat message", { user: "Sistem", text: username + " masuk chat" });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", { user: socket.username, text: msg });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("chat message", {
        user: "Sistem",
        text: socket.username + " keluar",
      });
    }
  });
});

const port = 3000;
http.listen(port, () => console.log("Server jalan di port " + port));
