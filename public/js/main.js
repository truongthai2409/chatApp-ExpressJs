const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users_list");

// console.log(userList)

let { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

let Variable = { username, room }

// console.log(Variable)

const socket = io();

socket.emit("joinRoom", Variable);

socket.on("roomUsers", (Variable) => {
  // outputRoomName(room);
  // console.log(Variable)
  outputUsers(Variable.users);
  // console.log(outputUsers(Variable.users))
});

socket.on("message", (message) => {
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  console.log(msg);
  if (!msg) {
    return false;
  }
  socket.emit("chatMessage", msg);
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement("div");
  const classDiv = ["d-flex", "flex-row", "justify-content-end", "message"];
  for (const p of classDiv) {
    div.classList.add(p);
  }
  // div.classList.add(classDiv);
  const pText = document.createElement("p");
  const classP = [
    "small",
    "p-2",
    "me-3",
    "mb-1",
    "text-white",
    "rounded-3",
    "bg-primary",
    "meta",
    // "float-end",
  ];
  for (const abc of classP) {
    pText.classList.add(abc);
  }
  

  const timer = document.createElement("p");
  const timPe = ["small", "me-3", "mb-3", "rounded-3", "text-muted"];
  for (const abc of timPe) {
    timer.classList.add(abc);
  }

  const avatar = document.createElement('img');
  avatar.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp";
  avatar.alt="avatar 1";
  avatar.style="width: 45px; height: 100%"

  const Div1 = document.createElement('div');
  
  Div1.appendChild(pText);
  Div1.appendChild(timer);
  div.appendChild(Div1);
  div.appendChild(avatar);


  // p.innerText = message.username;
  pText.innerText = message.text;
  timer.innerText = `${message.time} ${message.username}` ;
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.classList.add('p-2')

    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let divImg = document.createElement('div');
    let img = document.createElement('img');
    let divName = document.createElement('div');
    let name = document.createElement('p');

    img.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp";
    img.style="width: 60px";
   
    const classDiv1 = ["d-flex", "justify-content-between"];
    const classDiv2 = ["d-flex", "flex-row"]; 
    const classImg = ["d-flex", "align-self-center", "me-3"];
    const className = ["fw-bold", "mb-0", "d-flex", "justify-content-between"];  


    for (const p of classDiv1) {
      div1.classList.add(p);
    }
    for (const p of classDiv2) {
      div2.classList.add(p);
    }
    for (const p of classImg) {
      img.classList.add(p);
    }
    for (const p of className) {
      name.classList.add(p);
    }

    divName.classList.add('pt-1');

    name.innerText = user.username;
    userList.appendChild(li);
    li.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(divImg);
    divImg.appendChild(img);
    div2.appendChild(divName);
    divName.appendChild(name);
    
   
    
  });
}

//Prompt the user before leave chat room
// document.getElementById('leave-btn').addEventListener('click', () => {
//   const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
//   if (leaveRoom) {
//     window.location = '../index.html';
//   } else {
//   }
// });


