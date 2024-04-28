var audioCtx;
var analyser;
const audio = document.getElementById('audio');
const canvas = document.querySelector('.frequency-bars');
const canvasCtx = canvas.getContext('2d');
const input = document.getElementById('in');

var bufferLength;
var dataArray;
var source;
var drawVisual;

input.onchange = function(e){
  var reader = new FileReader();
  reader.onload = function(e){
    audio.src = this.result;
    initMusic();
  }
  reader.readAsDataURL(this.files[0]);
}


function draw(){

  drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);//getFloatTimeDomainData

  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  //canvasCtx.beginPath();
  const sliceWidth = canvas.width * 1.0 / bufferLength;
  let x = 0;

  canvasCtx.beginPath();
  for(var i = 0; i < bufferLength; i++){
    const v = dataArray[i]/128.0; //  dataArray[i] * 200.0
    const y = v * canvas.height/2; //  canvas.height/2 + v

    if(i === 0){
      canvasCtx.moveTo(x, y);
    }else{
      canvasCtx.lineTo(x, y);
    }
    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height);
  canvasCtx.stroke();
}

function initMusic(){
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
   analyser = audioCtx.createAnalyser();
 source = audioCtx.createMediaElementSource(audio);
   source.connect(analyser);
   analyser.connect(audioCtx.destination);

     analyser.fftSize = 2048; //1024
     bufferLength = analyser.fftSize;
     dataArray = new Uint8Array(bufferLength); // Float32Array
     canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
   draw();
}
