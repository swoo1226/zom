import http from "http";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const PORT = 3000;

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const server = http.createServer(app);
//동일한 port에 Httpt서버와 websocket 서버를 같이 띄우기 위함
//2개의 프로토콜이 port를 공유함
//ws 서버만 필요하면 ws 서버만 띄워도 됨
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected to Browser 🛑"));
  socket.on("message", (message, isBinary) => {
    isBinary ? console.log(message) : console.log(message.toString());
  });
  socket.send("hello!");
});

server.listen(PORT, handleListen);
