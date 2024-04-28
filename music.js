const audio = document.getElementById('song');
const progress = document.getElementById('song_progress');
const progressBar = document.getElementById('bar');
const play = document.getElementById('play');
const playsvg = document.getElementById('pl');
const pausesvg = document.getElementById('pa');
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');
const songName = document.getElementById('song_name');
const songArtist = document.getElementById('song_artist');
const volume = document.getElementById('volumeSlider');
const repeat = document.getElementById('repeat');
const album = document.getElementById('album');
const album_img = document.getElementById('album_img');
const mte = document.getElementById('mute');
const nmte = document.getElementById('vol');
const upload = document.getElementById('upload');
const pip = document.getElementById('pip');
const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 512;
const ctx = canvas.getContext('2d');
const video = document.createElement('video');
      video.srcObject = canvas.captureStream();
      video.setAttribute("loop","true");
      video.muted = true;
const input = document.createElement('input');
      input.setAttribute('type','file');
var setname = null;
var d = null;
//var randomcolor;
var hue = 0;
var requestIDAn = null;
var context = null;
var canvas1 = null, ctx1 = null, analyser = null;
const mucontainer = document.getElementById('mucontainer');
const downloadsvg = document.getElementById('downloadsvg');
const deletesvg = document.getElementById('deletesvg');
const refreshsvg = document.getElementById('refreshsvg');
var selectedsong = [];
var selectedno = 0;
const selectall = document.getElementById('selectall');
const bc = new BroadcastChannel('dialog');

bc.onmessage = function(ev){
  //log(ev);
  if(ev.data.event === 'Yes' && ev.data.detail === 'Sure'){
    //log(selectedsong);
    for(var i = 0; i < selectedsong.length; i++){
      selectedsong[i].parentElement.classList.remove("flyin");
      selectedsong[i].parentElement.classList.add("sboxhide");
    }
    kuact();
    selectall.checked = false;
    selectedno = 0;
    selectedsong.splice(0, selectedsong.length);
    //log(selectedsong);
    setTimeout(function(e){
      while(mucontainer.getElementsByClassName("sboxhide").length != 0){
        mucontainer.removeChild(mucontainer.getElementsByClassName("sboxhide")[0]);
      }
    },1000);
    //log(selectedsong);
  }else if(ev.data.event === 'No' && ev.data.detail === 'Exit'){

  }
}

window.addEventListener('keydown',keyEvent);

function keyEvent(){
  if(event.keyCode === 38){
    event.preventDefault();
    //log('Up');
    if(audio.volume + 0.05 <= 1){
      audio.volume+=0.05;
    }
  }else if(event.keyCode === 40){
    event.preventDefault();
    //log('down');
    if(audio.volume - 0.05 >= 0){
      audio.volume-=0.05;
    }
  }else if(event.keyCode === 37){
    event.preventDefault();
    //log('left');
    audio.currentTime-=5;
  }else if(event.keyCode === 39){
    event.preventDefault();
    //log('right');
    audio.currentTime+=5;
  }else if(event.keyCode === 32){
    //log('Space');
    if(audio.paused){
      audio.play();
    }else{
      audio.pause();
    }
  }
  // else{
  //   log(event);
  // }
}

async function selectalls(){
  if(selectall.checked == true && mucontainer.getElementsByClassName("sbox").length != 0){
    selectall.checked = true;
    ukact();
    //log(selectedsong);
    selectedsong.splice(0,selectedsong.length);
    selectedno = 0;
    //log(selectedsong);
    for(var i = 0;i < mucontainer.getElementsByClassName('sinput').length;i++){
      mucontainer.getElementsByClassName('sinput')[i].checked = true;
      mucontainer.getElementsByClassName('sinput')[i].parentElement.children[2].classList.add("disableddiv");
      selectedsong[selectedno] = mucontainer.getElementsByClassName('sinput')[i];
      selectedno++;
      //log(i);
    }
    //log(selectedsong);
  }else{
    if(mucontainer.getElementsByClassName('sbox').length != 0){
    selectall.checked = false;
    kuact();
    selectedsong.splice(0,selectedsong.length);
    selectedno = 0;
    //log(selectedsong);
    for(var i = 0;i < mucontainer.getElementsByClassName('sinput').length;i++){
      mucontainer.getElementsByClassName('sinput')[i].checked = false;
      mucontainer.getElementsByClassName('sinput')[i].parentElement.children[2].classList.remove("disableddiv");
      //log(i);
    }
  }else{
    selectall.checked = false;
  }
}
}

selectall.addEventListener('click',selectalls);

refreshsvg.addEventListener('click',function(e){
  refreshsvg.classList.add("rotateanimation");
},false);

function ukact(){
var ukactive = new CustomEvent("rdactive",{
  detail:"HELLO"
  });
  deletesvg.dispatchEvent(ukactive);
  downloadsvg.dispatchEvent(ukactive);
}

function kuact(){
  var ukdeactive = new CustomEvent("rddeactive",{
    detail:"HELLO"
    });
    deletesvg.dispatchEvent(ukdeactive);
    downloadsvg.dispatchEvent(ukdeactive);
}


function getimdel(){
  //log('delete');
  var a = {
    event:'Show',
    detail:1
  };
  bc.postMessage(a);
}

function getimdown(){
  log('download');
}

function greendiv(){
  deletesvg.style.backgroundColor = '#2baf2b';
  deletesvg.getElementsByTagName('img')[0].src = './src/assets/icons/del-white.svg';
}

function transdiv(){
  deletesvg.style.backgroundColor = '';
  deletesvg.getElementsByTagName('img')[0].src = './src/assets/icons/del-black.svg';
}

function greendiv1(){
  downloadsvg.style.backgroundColor = '#2baf2b';
  downloadsvg.getElementsByTagName('img')[0].src = './src/assets/icons/down-white.svg';
}

function transdiv1(){
  downloadsvg.style.backgroundColor = '';
  downloadsvg.getElementsByTagName('img')[0].src = './src/assets/icons/down-black.svg';
}

deletesvg.addEventListener('rdactive',function(e){
  deletesvg.getElementsByTagName('img')[0].src = './src/assets/icons/del-black.svg';
  deletesvg.addEventListener('mouseover',greendiv);
  deletesvg.addEventListener('mouseout',transdiv);
  deletesvg.addEventListener('click',getimdel);
});

downloadsvg.addEventListener('rdactive',function(e){
  downloadsvg.getElementsByTagName('img')[0].src = './src/assets/icons/down-black.svg';
  downloadsvg.addEventListener('mouseover',greendiv1);
  downloadsvg.addEventListener('mouseout',transdiv1);
  downloadsvg.addEventListener('click',getimdown);
});

deletesvg.addEventListener('rddeactive',function(e){
  deletesvg.getElementsByTagName('img')[0].src = './src/assets/icons/del-gray.svg';
  deletesvg.removeEventListener('mouseover',greendiv);
  deletesvg.removeEventListener('mouseout',transdiv);
  deletesvg.removeEventListener('click',getimdel);
});

downloadsvg.addEventListener('rddeactive',function(e){
  downloadsvg.getElementsByTagName('img')[0].src = './src/assets/icons/down-gray.svg';
  downloadsvg.removeEventListener('mouseover',greendiv1);
  downloadsvg.removeEventListener('mouseout',transdiv1);
  downloadsvg.removeEventListener('click',getimdown);
});

function hover(element){
  element.setAttribute('src','./src/assets/icons/play-green.svg');
}

function unhover(element){
  element.setAttribute('src','./src/assets/icons/play-gray.svg');
}

function hover1(element){
  element.setAttribute('src','./src/assets/icons/down-green.svg');
}

function unhover1(element){
  element.setAttribute('src','./src/assets/icons/down-gray.svg');
}

function hover2(element){
  element.setAttribute('src','./src/assets/icons/del-green.svg');
}

function unhover2(element){
  element.setAttribute('src','./src/assets/icons/del-gray.svg');
}

function handleProgress(){
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  format1(audio.currentTime);
}

function handleRangeUpdate()
{
	audio[this.name] = this.value;
}

function scrub(e)
{
	const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
	audio.currentTime = scrubTime;
}
function log(t){console.log(t);}
window.addEventListener('message', function(event){
  //log(event);

}, false);

function ShowHide(element){
  if(element.style.display == 'block'){
    element.style.display = 'none';
  }else{
    element.style.display = 'block';
  }
}

function isDisplayed(element){
  if(element.style.display == 'block'){
      //Do Nothing
  }else{
    element.style.display = 'block';
  }
}

function setPipButton(){
  log((video.readyState === 0) || !document.pictureInPictureEnabled || video.disablePictureInPicture);
  pip.disabled = (video.readyState === 0) || !document.pictureInPictureEnabled || video.disablePictureInPicture;
}

audio.addEventListener('loadstart',function(e){
  //log('Starting Loading Song');
  audio.currentTime = 0;
  progressBar.style.flexBasis = `0%`;
  audio.pause();
  pausesvg.style.display = 'none';
  playsvg.style.display = 'block';
});

audio.addEventListener('ended',function(event){
  pausesvg.style.display = 'none';
  playsvg.style.display = 'block';
});

audio.addEventListener('pause',function(e){
  pausesvg.style.display = 'none';
  playsvg.style.display = 'block';
  document.getElementById('thumb').classList.add('pause');
  try{
  if(context !== null && context.state === 'running'){
    context.suspend().then(function(){
      window.cancelAnimationFrame(requestIDAn);
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      log('Audio Context Paused');
    });
  }}catch(err){
    log(err);
  }
});

audio.addEventListener('play',function(e){
  pausesvg.style.display = 'block';
  playsvg.style.display = 'none';
  document.getElementById('thumb').classList.remove('pause');
  try{
  if(context !== null && context.state === 'suspended'){
    context.resume().then(function(){
      frameLooper();
      log('Audio Context Playing');
    });
    }
  }catch(err){
    log(err);
  }
});

audio.addEventListener('volumechange',function(e){
  volume.value = audio.volume;
  if((Math.round(audio['volume'] * 10)) == 0){
    nmte.style.display = 'none';
    mte.style.display = 'block';
  }else{
    mte.style.display = 'none';
    nmte.style.display = 'block';
  }
});

nmte.addEventListener('click',function(e){
  if(mte.style.display === 'none'){
    mte.style.display = 'block';
    audio['volume'] = 0;
    volume.value = 0;
  }else{
    mte.style.display = 'none';
  }
});

mte.addEventListener('click',function(e){
  if(nmte.style.display === 'none'){
    nmte.style.display = 'block';
    audio['volume'] = 1;
    volume.value = 1;
  }else{
    mmte.style.display = 'none';
  }
});

audio.addEventListener('timeupdate',handleProgress);
volume.addEventListener('mousemove', handleRangeUpdate);

progress.addEventListener('click', scrub);
progress.addEventListener('click', handleProgress);

function mediasession(){
navigator.mediaSession.setActionHandler('pause', function(){
  audio.pause();
  log('Paused');
  pausesvg.style.display = 'none';
  playsvg.style.display = 'block';
  album_img.classList.remove('rotateanimation');
  navigator.mediaSession.playbackState = "paused";
  if(document.pictureInPictureElement){
    document.pictureInPictureElement.pause();
  }
});

navigator.mediaSession.setActionHandler('play',splay);

function splay(){
  log('Playing');
  audio.play();
  pausesvg.style.display = 'block';
  playsvg.style.display = 'none';
  album_img.classList.add('rotateanimation');
  navigator.mediaSession.playbackState = "playing";
  if(document.pictureInPictureElement){
      document.pictureInPictureElement.play();
  }
}

navigator.mediaSession.setActionHandler('previoustrack',function(){

});

navigator.mediaSession.setActionHandler('nexttrack',function(){

});

}

function splay(name,artist){
  //log(this.event.srcElement.parentElement.parentElement.children[1].dataset.value);
  if(audio.paused){
      audio.src = `${this.event.srcElement.parentElement.parentElement.children[1].dataset.value}`;
      songName.innerHTML = name || 'Local Music';
      songArtist.innerHTML = artist || 'Local Artist';
  }else{
    audio.pause();
    audio.src = `${this.event.srcElement.parentElement.parentElement.children[1].dataset.value}`;
    songName.innerHTML = name || 'Local Music';
    songArtist.innerHTML = artist || 'Local Artist';
  }
}

function sdown(name){
  //log(this.event.srcElement.parentElement.parentElement.children[1].dataset.value);
  var a  = document.createElement('a');
    a.href = `${this.event.srcElement.parentElement.parentElement.children[1].dataset.value}`;
    a.setAttribute('download',name || 'Local Music');
    a.click();
}

function sdel(){
  //log(this.event.srcElement.parentElement.parentElement.classList);
  this.event.srcElement.parentElement.parentElement.classList.add("sboxhide");
  var a = this.event.srcElement.parentElement.parentElement;
  setTimeout(function(){
    a.parentNode.removeChild(a);
    a = null;
  },400);
}

var musicExplorer = {
  newsong:async function(){
    if(mucontainer.getElementsByClassName('sbox').length == 1 || selectall.checked == true){
      selectall.checked = false;
      //log(selectedsong);
    }
    var sbox = document.createElement('div');
      sbox.setAttribute('class','sbox');
      sbox.classList.add("addflyin");
    var sinput = document.createElement('input');
      sinput.setAttribute('type','checkbox');
      sinput.setAttribute('class','sinput');
      sinput.setAttribute('onclick','ucheckbox();');
      sinput.setAttribute('name','select');
    var sname = document.createElement('div');
      sname.setAttribute('class','sname');
      sname.innerHTML = 'Local Music';
      sname.setAttribute('data-value','Media/g.mp3');
    var soperation = document.createElement('div');
      soperation.setAttribute('class','soperation');
    var splay = document.createElement('IMG');
      splay.setAttribute('class','splay');
      splay.setAttribute('src','./src/assets/icons/play-gray.svg');
      splay.setAttribute('onclick','splay();');
      splay.setAttribute('onmouseover','hover(this);');
      splay.setAttribute('onmouseout','unhover(this);');
      splay.setAttribute('alt','Play Song');

    var sdown = document.createElement('IMG');
      sdown.setAttribute('class','sdown');
      sdown.setAttribute('src','./src/assets/icons/down-gray.svg');
      sdown.setAttribute('onclick','sdown();');
      sdown.setAttribute('onmouseover','hover1(this);');
      sdown.setAttribute('onmouseout','unhover1(this);');
      sdown.setAttribute('alt','Download Song');

    var sdel = document.createElement('IMG');
      sdel.setAttribute('class','sdel');
      sdel.setAttribute('src','./src/assets/icons/del-gray.svg');
      sdel.setAttribute('onclick','sdel();');
      sdel.setAttribute('onmouseover','hover2(this);');
      sdel.setAttribute('onmouseout','unhover2(this);');
      sdel.setAttribute('alt','Delete Song');

  var sartist = document.createElement('div');
    sartist.setAttribute('class','sartist');
    sartist.innerHTML = 'Chitranjan Gupta';

  var sduration = document.createElement('div');
      sduration.setAttribute('class','sduration');
      sduration.innerHTML = '3:00';

  var sformat = document.createElement('div');
        sformat.setAttribute('class','sformat');
        sformat.innerHTML = 'MP3';

  var ssize = document.createElement('div');
      ssize.setAttribute('class','ssize');
      ssize.innerHTML = '4.00MB';

  soperation.appendChild(splay);
  soperation.appendChild(sdown);
  soperation.appendChild(sdel);

  sbox.appendChild(sinput);
  sbox.appendChild(sname);
  sbox.appendChild(soperation);
  sbox.appendChild(sartist);
  sbox.appendChild(sduration);
  sbox.appendChild(sformat);
  sbox.appendChild(ssize);

  mucontainer.appendChild(sbox);
  }
};

async function ucheckbox(){
  //log(this.event);
  //log(this.event.srcElement.checked);
  var a = this.event.srcElement;
  if(a.checked == true){
    //log('Selected');
    //log(selectedno);
     ukact();
     selectedsong[selectedno] = a;
     selectedno++;
     if(mucontainer.getElementsByClassName("sbox").length === 1 || mucontainer.getElementsByClassName("sbox").length === selectedsong.length){
       selectall.checked = true;
     }
     a.parentElement.children[2].classList.add("disableddiv");
  }else{
    //log('Not Selected');
    if(selectedno != 0){
       var inD = getIndex(selectedsong,a);
       if(inD != -1){
         //log('Yes');
         selectedsong.splice(inD, 1);
         //log(selectedsong);
         selectedno--;
         if(mucontainer.getElementsByClassName("sbox").length === 1 || mucontainer.getElementsByClassName("sbox").length !== selectedsong.length){
           selectall.checked = false;
         }
         if(selectedno == 0){
           kuact();
         }
          a.parentElement.children[2].classList.remove("disableddiv");
     }else{
       //log('no');
     }
   }else{
       kuact();
   }
  }
}

async function getIndex(array,object){
  if(array.length != 0){
  for(var i = 0;i < array.length;i++){
    if(array[i] == object){
      return i;
    }
  }
  return -1;
  }
}

document.addEventListener('DOMContentLoaded',function(event){
  songName.innerHTML = 'Sample Music';
  songArtist.innerHTML = 'Chitranjan Gupta';
  audio['volume'] = 0;
  if(!('pictureInPictureEnabled' in document)){
    //log('The Picture-in-Picture Web API is not available.');
      }else if(!document.pictureInPictureEnabled){
    //log('The Picture-in-Picture Web API is disabled. ');
      }else if('pictureInPictureEnabled' in document){
      //log('The Picture-in-Picture Web API is available. ');
      //setPipButton();
      mediasession();
  }

  if('mediaSession' in navigator){
    //log('Media Session Web API is supported. ');
      }else{
    //log('Media Session Web API is not supported. ');
  }

  play.addEventListener('click',function(event){
    if(audio.paused){
      audio.play();
      pausesvg.style.display = 'block';
      playsvg.style.display = 'none';
      album_img.classList.add('rotateanimation');

      if('mediaSession' in navigator){
      navigator.mediaSession.playbackState = "playing";
      }

      if(document.pictureInPictureElement){
        document.pictureInPictureElement.play();
      }

    }else{
      audio.pause();

      pausesvg.style.display = 'none';
      playsvg.style.display = 'block';
      album_img.classList.remove('rotateanimation');

      if('mediaSession' in navigator){
      navigator.mediaSession.playbackState = "paused";
      }

      if(document.pictureInPictureElement){
        document.pictureInPictureElement.pause();
      }
    }
  });

  upload.addEventListener('click',function(event){
      input.click();
  });

  input.onchange = function(e){
   if(this.files[0].type.toString().substring(0,5) == "audio"){
    var reader = new FileReader();
      reader.onload = function(e){
      audio.src = this.result;
        //context.close();
        initMusic();
      };
      setname = this.files[0].name.substring(0,(this.files[0].name.length - this.files[0].type.substring(6,this.files[0].type.length).length));
      reader.readAsDataURL(this.files[0]);
    var url = this.files[0].name || this.files[0].urn;
    ID3.loadTags(url, function() {
        showTags(url);
      }, {
        tags: ["title","artist","album","picture"],
        dataReader: ID3.FileAPIReader(this.files[0])
      });
  }else{
    log(this.files[0].type.toString()+' This Format Of Audio File Is Not Supported.');
  }
}

  backward.addEventListener('click',function(event){
    audio.currentTime-=5;
  });

  forward.addEventListener('click',function(event){
    audio.currentTime+=5;
  });

  video.addEventListener('enterpictureinpicture',function(event){
    let pipWindow = event.pictureInPictureWindow;
    log(pipWindow.width, pipWindow.height);
  });

  audio.addEventListener('loadedmetadata',(event) => {
    //log(event);
    if(audio.duration != 'NaN'){
      //log(audio.duration);
      format(audio.duration);
    }else{
      log('Audio Not Loaded Correctly. Therefore Audio Infinity');
    }
  });

  repeat.addEventListener('click',function(event){
    if(audio.loop != true){
    audio.setAttribute("loop","true");
    audio.play();
    log('Repeat');

  }else{
    audio.removeAttribute("loop");
    log('Not Repeat');
  }
  });

  pip.addEventListener('click',function(event){
    if(!('pictureInPictureEnabled' in document)){
      //log('The Picture-in-Picture Web API is not available.');
    }else if(!document.pictureInPictureEnabled){
      //log('The Picture-in-Picture Web API is disabled. ');
    }else if('pictureInPictureEnabled' in document){
          showPictureInPictureWindow();
    }
    /*try{
      if(!document.pictureInPictureElement){
          video.requestPictureInPicture()
            .catch(error =>{
              log('Audio Failed to Enter Picture In Picture Mode');
            });
      }else{
       document.exitPictureInPicture()
        .catch(error =>{
          log('Audio Failed to Leave Picture In Picture Mode');
        });
      }
    }catch(err){
      log(err);
    }*/
  });
});
async function showTags(url,filename) {
      var tags = ID3.getAllTags(url);
      log(tags);
       //log(tags.title,tags.artist,tags.album);
       if(tags.title != undefined){
         songName.innerHTML = tags.title;
         if(tags.artist != undefined){
           songArtist.innerHTML = tags.artist;
         }else{
           songArtist.innerHTML = 'Chitranjan Gupta';
         }
       }else{
         if(setname !== null){
            songName.innerHTML = setname;
            songArtist.innerHTML = 'Chitranjan Gupta';
            setname = null;
         }else{
         songName.title = 'Local Music';
         songArtist.innerHTML = 'Chitranjan Gupta';
         setname = null;
       }
       }
      var image = tags.picture;
      if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
                window.btoa(base64String);
        album_img.src = base64;
        d = new Image();
        d.src = base64;
        await d.decode();
      } else {
        try{
        d = new Image();
        d.src = './src/assets/icons/default-album-cover.png';
        await d.decode();
      }catch(err){
        log(err);
      }
      }
  }
async function showPictureInPictureWindow(){
  try{
  ctx.drawImage(d, 0, 0, 512, 512);
  await video.play();
  await video.requestPictureInPicture();
}catch(err){
  log(err);
}
}
function frameLooper(){
  requestIDAn = requestAnimationFrame(frameLooper);
  var fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  //randomcolor = Math.floor(Math.random()*16777215).toString(16);
  //ctx1.fillStyle = "#"+randomcolor;
  ctx1.fillStyle = `hsl(${hue}, 100%, 50%)`;
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  var bars = 300;
  for(var i = 0; i < bars; i++){
    var bar_x = i * 2;
    var bar_width = 1;
    var bar_height = -(fbc_array[i] / 2);
    ctx1.fillRect(bar_x, canvas1.height, bar_width, bar_height);
  }
}

function format(seconds){
  document.querySelector('.full').innerHTML = formatDuration(seconds);
}

function formatDuration(duration){
	function padLeft(num, length) {
      var r = String(num);
      while (r.length < length) {
        r = '0' + r;
      }
      return r;
    }

    duration = Math.round(duration);
    var minutes = Math.floor(duration / 60);
    var seconds = duration % 60;
    if (minutes < 60) {
      return padLeft(minutes, 2) + ':' + padLeft(seconds, 2);
    }
    var hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
    return hours + ':' + padLeft(minutes, 2) + ':' + padLeft(seconds, 2);
}

function format1(seconds){
  document.querySelector('.now').innerHTML = formatDuration(seconds);
}

function initMusic(){
  try{
  context = new AudioContext();
  analyser = context.createAnalyser();
  canvas1 = document.getElementById('analyser');
  ctx1 = canvas1.getContext('2d');
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();
}catch(err){
  log(err);
}
}
