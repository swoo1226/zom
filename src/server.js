import http from "http";
import SocketIo from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const PORT = 3000;

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const httpServer = http.createServer(app);
//동일한 port에 Httpt서버와 websocket 서버를 같이 띄우기 위함
//2개의 프로토콜이 port를 공유함
//ws 서버만 필요하면 ws 서버만 띄워도 됨
// const wss = new WebSocketServer({ server });

const wsServer = SocketIo(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, cb) => {
    socket.join(roomName);
    cb();
    //room 내에서 socket 자신을 제외한 다른 모든 socket들에게 해당 이벤트를 emit
    socket.to(roomName).emit("welcome");
  });
});

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anon";
//   console.log("Connected to Browser ✅");
//   socket.on("close", () => console.log("Disconnected to Browser 🛑"));
//   socket.on("message", (message, isBinary) => {
//     const msg = JSON.parse(message);
//     switch (msg.type) {
//       case "new_message":
//         console.log("new message is", msg.payload);
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket["nickname"]}: ${msg.payload}`)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = msg.payload;
//         break;
//       default:
//         console.log("new message");
//     }
//   });
// });

httpServer.listen(PORT, handleListen);
