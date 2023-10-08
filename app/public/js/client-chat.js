// ==> chat.html
let socket = io();
let form = document.getElementById("form");
let input = document.getElementById("input");
let btnSignIn = document.getElementById("btnSignIn")
let btnSignUp = document.getElementById("btnSignUp")
let title = document.getElementById("title")
let nameField = document.getElementById("nameField")

btnSignIn.onclick = function(){
  nameField.style.height = "0";
}


// xử lý query string
const queryString = location.search;
console.log(queryString);

//gửi query
socket.emit("chat message query", { queryString });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    const acknowledgement = (error) => {
      if (error) {
        alert("Bạn nên nhập lại từ vì - " + error);
      } else {
        console.log("tin nhắn đã gửi thành công");
      }
    };
    socket.emit("chat message1", input.value, acknowledgement);
    input.value = "";
  }
});
//chat message client to sever
socket.on("chat message2", function (msg) {
  var item = document.createElement("li");
  var itemDate = document.createElement("span");
  item.textContent = msg.messageText;
  itemDate.textContent = msg.createDate;
  messages.appendChild(item);
  messages.appendChild(itemDate);
  window.scrollTo(0, document.body.scrollHeight);
  console.log(msg);
});

socket.on("chat message join", (msg) => {
  console.log(msg);
});

let shareLocation = document.getElementById("btn-share-location");
if (shareLocation) {
  shareLocation.addEventListener("click", () => {
    // a.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("share location form loaction", { latitude, longitude });
    });
  });
} else {
  console.log("lỗi rồi");
}

// nhận lại url
socket.on("share location form server", (linkLocation) => {
  console.log("URL: ", linkLocation);
});
socket.on("send list user", (msg) => {
  console.log(msg);
});
socket.on("disconnect2", (msg) => {
  console.log(msg);
});
