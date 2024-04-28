var audioCtx;
var analyser;
const audio = document.getElementById('audio');
const canvas = document.querySelector('.frequency-bars');
const canvasCtx = canvas.getContext('2d');
const input = document.getElementById('in');
const button = document.getElementById('but');
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
  analyser.getByteFrequencyData(dataArray);// getFloatFrequencyData

  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let posX = 0;

  for(let i = 0; i < bufferLength; i++){
    const barHeight = dataArray[i]; // (dataArray[i] + 140) * 2
    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)'; //'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)'
    canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
    posX += barWidth + 1;
  }

}

function initMusic(){
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
   analyser = audioCtx.createAnalyser();
 source = audioCtx.createMediaElementSource(audio);
   source.connect(analyser);
   analyser.connect(audioCtx.destination);
   analyser.fftSize = 256;
   bufferLength = analyser.frequencyBinCount; // analyser.fftSize
   dataArray = new Uint8Array(bufferLength); //Float32Array
   canvasCtx.clearRect(0,0,canvas.width, canvas.height);
   draw();
}
