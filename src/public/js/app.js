const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => {
    //서버에서 실행할 cb으로 보낸 console 함수이지만,
    //실제로 콘솔이 찍히는 건 브라우저 콘솔..!!!
    //cb의 호출은 서버에서 하지만 실행은 front에서 일어남
    console.log("server is done!");
  });
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
