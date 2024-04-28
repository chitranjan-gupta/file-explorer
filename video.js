const video = document.getElementById('song');
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
const mediumscreens = document.getElementById('mediumscreen');
const medsoundbar = document.getElementById('soundbar');
const medbrightnessbar = document.getElementById('brightnessbar');
const medscreen = document.getElementById('medscreen');
const medpausesvg = document.getElementById('medpa');
const medplaysvg = document.getElementById('medpl');
const medplay = document.getElementById('medplay');
const medforward = document.getElementById('medforward');
const medbackward = document.getElementById('medbackward');
const medprogress = document.getElementById('medsong_progress');
const medprogressBar = document.getElementById('medbar');
const medvolume = document.getElementById('ssbar');
const medvolumebar = document.getElementById('sbar');
const medbright = document.getElementById('bbar');
const medbrightbar = document.getElementById('brightbar');
const medtexts = document.getElementById('medtexts');
const medtracks = document.getElementById('medtracks');
const csound = document.getElementById('csound');
const cbrightness = document.getElementById('cbrightness');
const bvalue = document.getElementById('bvalue');
const btext = document.getElementById('btext');
const svalue = document.getElementById('svalue');
const stext = document.getElementById('stext');
const svaluemute = document.getElementById('medmute');
const svaluenmute = document.getElementById('mednotmute');
const medvsize = document.getElementById('medvsize');
const mte = document.getElementById('mute');
const nmte = document.getElementById('vol');
const upload = document.getElementById('upload');
const pip = document.getElementById('pip');
const input = document.createElement('input');
      input.setAttribute('type','file');
var setname = null;
var d = null;
var kcount = 0;
var keyword = ["cover","fill","none","unset","contain","scale-down"];

const backArr = document.getElementById('arrow');

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

async function selectalls(){
  if(selectall.checked == true && mucontainer.getElementsByClassName('sbox').length != 0){
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

function splay(name,artist){
  //log(this.event.srcElement.parentElement.parentElement.children[1].dataset.value);
  if(video.paused){
      video.src = `${this.event.srcElement.parentElement.parentElement.children[1].dataset.value}`;
      songName.innerHTML = name || 'Local Video';
      songArtist.innerHTML = artist || 'Local Artist';
  }else{
    video.pause();
    video.src = `${this.event.srcElement.parentElement.parentElement.children[1].dataset.value}`;
    songName.innerHTML = name || 'Local Video';
    songArtist.innerHTML = artist || 'Local Artist';
  }
}

function sdown(name){
  //log(this.event.srcElement.parentElement.parentElement.children[1].dataset.value);
  var a  = document.createElement('a');
    a.href = `${this.event.srcElement.parentElement.parentElement.children[1].dataset.value}`;
    a.setAttribute('download',name || 'Local Video');
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

var videoExplorer = {
  newvideo:async function(){
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
      sname.innerHTML = 'Local Video';
      sname.setAttribute('data-value','Media/smoke.mp4');
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
      sduration.innerHTML = '10:00';

  var sformat = document.createElement('div');
        sformat.setAttribute('class','sformat');
        sformat.innerHTML = 'MP4';

  var ssize = document.createElement('div');
      ssize.setAttribute('class','ssize');
      ssize.innerHTML = '100MB';

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
     if(mucontainer.getElementsByClassName('sbox').length == 1 || mucontainer.getElementsByClassName('sbox').length == selectedsong.length){
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
         if(mucontainer.getElementsByClassName('sbox').length == 1 || mucontainer.getElementsByClassName('sbox').length != selectedsong.length){
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

backArr.addEventListener('click',function(e){
  medscreen.pause();
  mediumscreens.classList.add('hidemediumscreen');
  setInterval(function(e){
    mediumscreens.style.display = 'none';
  },2000);
});

function handleVolume(e){
  const s = Math.fround((e.offsetY / medvolume.offsetHeight));
    if(s > 0 && s < 1){
      medscreen['volume'] = s;
      //log(s);
    }
}

function handleVolumeProgress(){
  const percent = (medscreen.volume / 1) * 100;
  medvolumebar.style.flexBasis = `${percent}%`;
  //log(percent);
}

medvolume.addEventListener('click',handleVolume);
medvolume.addEventListener('click',handleVolumeProgress);

var onlongtouch;
var timer;

function touchstart(e){
  e.preventDefault();
  if(!timer){
    timer = setTimeout(onlongtouch,800);
  }
}

function touchend(){
  if(timer){
    clearTimeout(timer);
    timer = null;
    medvsize.addEventListener('click',changevideosize,false);
  }
}

onlongtouch = function(){
  medvsize.removeEventListener('click',changevideosize,false);
  timer = null;
  //log('Long Touch');
  choiceUI();
};

function choiceUI(){

}

medvsize.addEventListener('mousedown',touchstart,false);
medvsize.addEventListener('mouseup',touchend,false);

function changevideosize(){
  if(kcount < keyword.length){
    medscreen.style.objectFit = keyword[kcount];
    kcount++;
  }else{
    kcount = 0;
    medscreen.style.objectFit = keyword[kcount];
  }
}

medvsize.addEventListener('click',changevideosize,false);


function fadeOut(){

  document.getElementById('lower').classList.add("setopacity");
  document.getElementById('upper').classList.add("setopacity");

  document.getElementById('lower').classList.add("disableddiv");
  document.getElementById('upper').classList.add("disableddiv");

  document.getElementById('lower').classList.add("fadeout");
  document.getElementById('upper').classList.add("fadeout");

  document.getElementById('lower').classList.remove("fadein");
  document.getElementById('upper').classList.remove("fadein");
}

var medC;

function fadeIn(){
  document.getElementById('lower').classList.remove("fadeout");
  document.getElementById('upper').classList.remove("fadeout");

  document.getElementById('lower').classList.remove("setopacity");
  document.getElementById('upper').classList.remove("setopacity");

  document.getElementById('lower').classList.remove("disableddiv");
  document.getElementById('upper').classList.remove("disableddiv");

  document.getElementById('lower').classList.add("fadein");
  document.getElementById('upper').classList.add("fadein");

  if(medC) clearTimeout(medC);
  medC = setTimeout(fadeOut,800);
}

document.getElementById('customchange').addEventListener('mousemove',fadeIn,false);
document.getElementById('lower').addEventListener('mousemove',fadeIn,false);
document.getElementById('upper').addEventListener('mousemove',fadeIn,false);
var lasty = 0;
var storeBright = 10;
function handleBright(e){
  if(e.offsetY >= lasty){
    //log('down');
    if(storeBright - 3 >= 0){
      storeBright-=3;
      medscreen.style.filter = `brightness(${storeBright}%)`;
      medbrightbar.style.flexBasis = `${storeBright}%`;
      btext.innerText = `${storeBright}%`;
    }
  }else if(e.offsetY <= lasty){
    //log('up');
    if(storeBright + 3 <= 100){
      storeBright+=3;
      medscreen.style.filter = `brightness(${storeBright}%)`;
      medbrightbar.style.flexBasis = `${storeBright}%`;
      btext.innerText = `${storeBright}%`;
    }
  }
  lasty = e.offsetY;
  // const b = Math.fround((e.offsetY / medbright.offsetHeight)) * 100;
  // if(b < 100){
  //   medscreen.style.filter = `brightness(${b}%)`;
  //   medbrightbar.style.flexBasis = `${b}%`;
  //   btext.innerText = `${Math.round(b)}%`;
  // }
}

medbright.addEventListener('click',handleBright);

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  format1(video.currentTime);
}

function handleRangeUpdate()
{
	video[this.name] = this.value;
}

function scrub(e)
{
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
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
  //log((video.readyState === 0) || !document.pictureInPictureEnabled || video.disablePictureInPicture);
  pip.disabled = (video.readyState === 0) || !document.pictureInPictureEnabled || video.disablePictureInPicture;
}

video.addEventListener('loadstart',function(e){
  //log('Starting Loading Song');
  video.currentTime = 0;
  progressBar.style.flexBasis = `0%`;
  video.pause();
  pausesvg.style.display = 'none';
  playsvg.style.display = 'block';
});

video.addEventListener('ended',function(event){
  pausesvg.style.display = 'none';
  playsvg.style.display = 'block';
});

video.addEventListener('pause',function(e){
  pausesvg.style.display = 'none';
  playsvg.style.display = 'block';

});

video.addEventListener('play',function(e){
  pausesvg.style.display = 'block';
  playsvg.style.display = 'none';

});

video.addEventListener('volumechange',function(e){
  if((Math.round(video.volume * 10)) == 0){
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
    video.volume = 0;
    volume.value = 0;
  }else{
    mte.style.display = 'none';
  }
});

mte.addEventListener('click',function(e){
  if(nmte.style.display === 'none'){
    nmte.style.display = 'block';
    video.volume = 1;
    volume.value = 1;
  }else{
    mmte.style.display = 'none';
  }
});

video.addEventListener('timeupdate',handleProgress);
volume.addEventListener('change', handleRangeUpdate);
volume.addEventListener('mousemove', handleRangeUpdate);
video.addEventListener('emptied', setPipButton);


progress.addEventListener('click', scrub);
progress.addEventListener('click', handleProgress);

medscreen.addEventListener('ended',function(event){
  medpausesvg.style.display = 'none';
  medplaysvg.style.display = 'block';
});

medscreen.addEventListener('pause',function(e){
  medpausesvg.style.display = 'none';
  medplaysvg.style.display = 'block';
});

medscreen.addEventListener('play',function(e){
  medpausesvg.style.display = 'block';
  medplaysvg.style.display = 'none';
});

medscreen.addEventListener('volumechange',function(e){

});

function medhandleProgress(){
  const percent = (medscreen.currentTime / medscreen.duration) * 100;
  medprogressBar.style.flexBasis = `${percent}%`;
}
function medscrub(e)
{
	const scrubTime = (e.offsetX / medprogress.offsetWidth) * medscreen.duration;
	medscreen.currentTime = scrubTime;
}

medscreen.addEventListener('timeupdate',medhandleProgress);
medprogress.addEventListener('click', medscrub);
medprogress.addEventListener('click', medhandleProgress);

medtracks.addEventListener('click',function(e){
  if(medscreen.audioTracks == undefined){
    log('Multiple Audio Tracks Is Not Supported');
  }else{
      log(medscreen.audioTracks.length);
  }
});

medtexts.addEventListener('click',function(e){
  if(medscreen.textTracks == undefined){
    log('Multiple Audio Tracks Is Not Supported');
  }else{
      log(medscreen.textTracks);
  }
});

function mediasession(){
navigator.mediaSession.setActionHandler('pause', function(){
  video.pause();
  log('Paused');
  pausesvg.style.display = 'none';
  playsvg.style.display = 'block';
  navigator.mediaSession.playbackState = "paused";
  if(document.pictureInPictureElement){
    document.pictureInPictureElement.pause();
  }
});

navigator.mediaSession.setActionHandler('play',splay);

function splay(){
  log('Playing');
  video.play();
  pausesvg.style.display = 'block';
  playsvg.style.display = 'none';
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

document.addEventListener('DOMContentLoaded',function(event){
  songName.innerHTML = 'Sample Video';
  songArtist.innerHTML = 'Chitranjan Gupta';
  medscreen['volume'] = 0;
  video['volume'] = 0;

  if(!('pictureInPictureEnabled' in document)){
    //log('The Picture-in-Picture Web API is not available.');
      }else if(!document.pictureInPictureEnabled){
    //log('The Picture-in-Picture Web API is disabled. ');
      }else if('pictureInPictureEnabled' in document){
      //log('The Picture-in-Picture Web API is available. ');
      setPipButton();
      mediasession();
  }

  function unlockmed(){
    document.getElementById('unlockmed').classList.add('setopacity');
    document.getElementById('unlockmed').classList.add('disableddiv');
    document.getElementById('unlockmed').classList.add('fadeout');
    document.getElementById('unlockmed').classList.remove('fadein');
    document.getElementById('customchange').classList.remove('disableddiv');
    document.getElementById('customchange').addEventListener('mousemove',fadeIn,false);
    document.getElementById('lower').addEventListener('mousemove',fadeIn,false);
    document.getElementById('upper').addEventListener('mousemove',fadeIn,false);
  }

  document.getElementById('unlockmed').addEventListener('click',unlockmed,false);

  function lockmed(){
    document.getElementById('unlockmed').classList.remove('setopacity');
    document.getElementById('unlockmed').classList.remove('disableddiv');
    document.getElementById('unlockmed').classList.remove('fadeout');
    document.getElementById('unlockmed').classList.add('fadein');
    document.getElementById('customchange').classList.add('disableddiv');
    document.getElementById('customchange').removeEventListener('mousemove',fadeIn,false);
    document.getElementById('lower').removeEventListener('mousemove',fadeIn,false);
    document.getElementById('upper').removeEventListener('mousemove',fadeIn,false);
    fadeOut();
  }

  document.getElementById('lock').addEventListener('click',lockmed,false);

  if('mediaSession' in navigator){
    //log('Media Session Web API is supported. ');
      }else{
    //log('Media Session Web API is not supported. ');
  }

  play.addEventListener('click',function(event){
    if(video.paused){
      video.play();
      pausesvg.style.display = 'block';
      playsvg.style.display = 'none';
      if('mediaSession' in navigator){
      navigator.mediaSession.playbackState = "playing";
    }
      if(document.pictureInPictureElement){
        document.pictureInPictureElement.play();
      }
    }else{
      video.pause();
      pausesvg.style.display = 'none';
      playsvg.style.display = 'block';
      if('mediaSession' in navigator){
      navigator.mediaSession.playbackState = "paused";
    }
      if(document.pictureInPictureElement){
        document.pictureInPictureElement.pause();
      }
    }
  });

  medplay.addEventListener('click',function(event){
    if(medscreen.paused){
      medscreen.play();
      medpausesvg.style.display = 'block';
      medplaysvg.style.display = 'none';
      if('mediaSession' in navigator){
      navigator.mediaSession.playbackState = "playing";
    }
      if(document.pictureInPictureElement){
        document.pictureInPictureElement.play();
      }
    }else{
      medscreen.pause();
      medpausesvg.style.display = 'none';
      medplaysvg.style.display = 'block';
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
   if(this.files[0].type.toString().substring(0,5) == "video"){
    var reader = new FileReader();
      reader.onload = function(e){
        video.src = this.result;

      };
      setname = this.files[0].name.substring(0,(this.files[0].name.length - this.files[0].type.substring(6,this.files[0].type.length).length));
      reader.readAsDataURL(this.files[0]);

  }else{
    log(this.files[0].type.toString()+' This Format Of video File Is Not Supported.');
  }
}

  backward.addEventListener('click',function(event){
    video.currentTime-=5;
  });

  forward.addEventListener('click',function(event){
    video.currentTime+=5;
  });

  video.addEventListener('enterpictureinpicture',function(event){

  });

  video.addEventListener('loadedmetadata',(event) => {
    //log(event);
    setPipButton();
  });

  video.addEventListener('durationchange',(event) =>{
    if(video.duration != 'NaN'){
      //log(video.duration);
      format(video.duration);
    }
  });

  medbackward.addEventListener('click',function(event){
    medscreen.currentTime-=5;
  });

  medforward.addEventListener('click',function(event){
    medscreen.currentTime+=5;
  });

  medscreen.addEventListener('enterpictureinpicture',function(event){
	
  });

/*  medscreen.addEventListener('canplaythrough', (event) => {
	  console.log(event);
  });*/
  
  medscreen.addEventListener('canplay', (event) => {
	  //console.log(event);
  });
  
  medscreen.addEventListener('loadeddata', (event) => {
	  //console.log(event);
  });
  
/*  medscreen.addEventListener('loadstart', (event) => {
	  console.log(event);
  });*/
  
  medscreen.addEventListener('progress', (event) => {
	  //console.log(event);
  });
  
  medscreen.addEventListener('stalled', (event) => {
	  //console.log(event);
  });
  
  medscreen.addEventListener('suspend', (event) => {
	  //console.log(event);
  });
  
  medscreen.addEventListener('loadedmetadata',(event) => {
    //log(event);
    if(medscreen.duration != 'NaN'){
      //log(medscreen.duration);
      //format(medscreen.duration);
    }
  });


  repeat.addEventListener('click',function(event){
    if(video.loop != true){
    video.setAttribute("loop","true");
    video.play();
    log('Repeat');

  }else{
    video.removeAttribute("loop");
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
              log('video Failed to Enter Picture In Picture Mode');
            });
      }else{
       document.exitPictureInPicture()
        .catch(error =>{
          log('video Failed to Leave Picture In Picture Mode');
        });
      }
    }catch(err){
      log(err);
    }*/
  });
  var lastY = 0;
  function handleVolume1(e){
    if(e.offsetY >= lastY){
      //log('down');
      if(medscreen['volume'] - 0.01 >= 0){
        medscreen['volume']-=0.01;
      }
    }else if(e.offsetY <= lastY){
      //log('up');
      if(medscreen['volume'] + 0.01 <= 1){
          medscreen['volume']+=0.01;
      }
    }
    lastY = e.offsetY;
  }

  function handleVolumeProgress1(){
    const percent = (medscreen.volume / 1) * 100;
    medvolumebar.style.flexBasis = `${percent}%`;
  }

  function changesvalue(){
    stext.innerText = Math.round(medscreen.volume * 10);
    if((Math.round(medscreen.volume * 10)) == 0){
      svaluemute.style.display = 'block';
      svaluenmute.style.display = 'none';
    }else{
      svaluenmute.style.display = 'block';
      svaluemute.style.display = 'none';
    }
  }

  function mousemove(e){
    medsoundbar.style.display = 'flex';
    svalue.style.display = 'flex';
    changesvalue();
    handleVolume1(e);
    handleVolumeProgress1();
  }

  function mousemove1(e){
    medbrightnessbar.style.display = 'flex';
    bvalue.style.display = 'flex';
    handleBright(e);
  }

  csound.addEventListener('mousedown',function(e){
    lastY = e.offsetY;
    csound.addEventListener('mousemove',mousemove);
    document.getElementById('customchange').removeEventListener('mousemove',fadeIn,false);
    document.getElementById('lower').removeEventListener('mousemove',fadeIn,false);
    document.getElementById('upper').removeEventListener('mousemove',fadeIn,false);
  });

  csound.addEventListener('mouseup',function(e){
    csound.removeEventListener('mousemove',mousemove);
    document.getElementById('customchange').addEventListener('mousemove',fadeIn,false);
    document.getElementById('lower').addEventListener('mousemove',fadeIn,false);
    document.getElementById('upper').addEventListener('mousemove',fadeIn,false);
    medsoundbar.style.display = 'none';
    svalue.style.display = 'none';
  });

  cbrightness.addEventListener('mousedown',function(e){
    lasty = e.offsetY;
    cbrightness.addEventListener('mousemove',mousemove1);
    document.getElementById('customchange').removeEventListener('mousemove',fadeIn,false);
    document.getElementById('lower').removeEventListener('mousemove',fadeIn,false);
    document.getElementById('upper').removeEventListener('mousemove',fadeIn,false);
  });

  cbrightness.addEventListener('mouseup',function(e){
    cbrightness.removeEventListener('mousemove',mousemove1);
    document.getElementById('customchange').addEventListener('mousemove',fadeIn,false);
    document.getElementById('lower').addEventListener('mousemove',fadeIn,false);
    document.getElementById('upper').addEventListener('mousemove',fadeIn,false);
    medbrightnessbar.style.display = 'none';
    bvalue.style.display = 'none';
  });

});

async function showPictureInPictureWindow(){
  try{
  await video.play();
  await video.requestPictureInPicture();
}catch(err){
  log(err);
}
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

function format(seconds){
  document.querySelector('.full').innerHTML = formatDuration(seconds);
}

function format1(seconds){
  document.querySelector('.now').innerHTML = formatDuration(seconds);
}
