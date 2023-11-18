// ============= Trợ lý ảo ===============
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;


const recognition = new SpeechRecognition();

recognition.lang = 'vi-VI';
// recognition.lang = 'en-US';
recognition.continuous = false;

const microphone = document.getElementById('mic');

const handleVoice  = (text) =>{
   
    let inputSpeech = document.getElementById("msg");
    let textSpeech = ''
    textSpeech = text
    console.log("123")
    console.log(textSpeech);
    console.log(inputSpeech);
    inputSpeech.value = textSpeech;
}

microphone.addEventListener('click', (e) =>{
    e.preventDefault();
    recognition.start();
    alert("Vui lòng nói tin nhắn mà bạn muốn!");
});

recognition.onspeeched =()=>{
    recognition.stop();
}

recognition.onerrorr = (err) =>{
    console.log(err);
}

recognition.onresult = (e) =>{
    console.log('onresult',e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}