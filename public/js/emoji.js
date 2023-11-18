const emoji = document.getElementById("emoji");
const emojiSelect = document.getElementById("emoji_select");
const divEmoji = document.querySelector(".emoji");

let array = [];
const pickerOptions = {
  onEmojiSelect: (emoji) => {
    let input = document.getElementById("msg");
    array.push(emoji.native);
    input.value = array;
  },
};

const picker = new EmojiMart.Picker(pickerOptions);

let check = true;

emoji.addEventListener("click", () => {
  if (check) {
    divEmoji.style.display = "block";
    divEmoji.appendChild(picker);
    array = [];
    check = false;
  }else{
    divEmoji.style.display = "none";
    check = true;
    array = [];
  }
});

