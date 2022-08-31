const msgList = document.querySelector("ul");
const msgForm = document.querySelector("#message");
const nickForm = document.querySelector("#nickname");

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMsg(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message:", message.data);
  const li = document.createElement("li");
  li.innerText = message.data;
  msgList.appendChild(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server 🛑");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = msgForm.querySelector("input");
  socket.send(makeMsg("new_message", input.value));
  input.value = "";
}
msgForm.addEventListener("submit", handleSubmit);

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMsg("nickname", input.value));
}
nickForm.addEventListener("submit", handleNickSubmit);
