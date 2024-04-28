(function(exports){

const overlay = document.getElementById('overlay');
const home = document.getElementById('home');
const music = document.getElementById('music');
const video = document.getElementById('video');
const picture = document.getElementById('picture');
const documents = document.getElementById('document');
const apps = document.getElementById('apps');
const files = document.getElementById('files');
const content = document.getElementById('content');
const mainNotification = document.getElementById('main-notification');
const dia = document.getElementById('dialogcontainer');
const ale = document.getElementById('alertcontainer');
const bc = new BroadcastChannel('dialog');

// window.addEventListener('keydown',function(e){
//   //log(event);
// });

function labelc(){
  var eventlabel = new CustomEvent('onlabeladded',{
    detail:mainNotification.getElementsByTagName('label').length
  });
  mainNotification.dispatchEvent(eventlabel);
  eventlabel = null;
}
bc.onmessage = function(ev){
  // log(ev);
  if(ev.data.event === 'Show' && ev.data.detail === 1){
    CustomPrompt.render('Are You Sure ?');
  }else if(ev.data.event === 'ShowAlert' && ev.data.detail === 1){
    CustomAlert.render(ev.data.data);
  }
}

function hover(){
    this.children[0].setAttribute('src',`${this.dataset.iconw}`);
}

function unhover(){
    this.children[0].setAttribute('src',`${this.dataset.icong}`);
}

var  CustomPrompt = {

   render:function(text){
     content.classList.add('cactive');
     dia.classList.add('active');
     var dok = dia.getElementsByClassName('dok')[0];
     dok.addEventListener('mousedown',hover);
     dok.addEventListener('mouseup',unhover);
     dok.addEventListener('click',this.ok);
     var dclose = dia.getElementsByClassName('dclose')[0];
     dclose.addEventListener('mousedown',hover);
     dclose.addEventListener('mouseup',unhover);
     dclose.addEventListener('click',this.cancel);
   },

   cancel:function(){
     var a = {
       event:'No',
       detail:'Exit'
     };
     bc.postMessage(a);
     content.classList.remove('cactive');
     dia.classList.remove('active');
   },

   ok:function(){
     var a = {
       event:'Yes',
       detail:'Sure'
     };
     bc.postMessage(a);
     content.classList.remove('cactive');
     dia.classList.remove('active');
   }

};
var customalerttimeout;
var  CustomAlert = {

   render:function(text){
     ale.getElementsByClassName('amessage')[0].innerText = text;
     ale.classList.add('active');
     if(customalerttimeout)clearTimeout(customalerttimeout);
     customalerttimeout = setTimeout(function(){
       ale.classList.remove('active');
     },7000);
   }
};

var Explorer = {

  // Change Folder
  cd: function () {

  },
  //Show Notification On Main Window
  notification: async function(message){
    var label = document.createElement("label");
        label.setAttribute('class','notification new');
    var em = document.createElement("em");
        em.innerText = message;
    var i = document.createElement('i');
        i.addEventListener('click',exitNode);
        i.innerText = 'X';
      label.appendChild(em);
      label.appendChild(i);
      mainNotification.appendChild(label);
      labelc();
      label = null;
      em = null;
      i = null;
  }

};


async function exitNode(){
  this.parentElement.classList.add("labelhide");
  var a = this;
  setTimeout(function(){
    a.parentElement.parentNode.removeChild(a.parentElement);
    labelc();
    a = null;
  },300);
}

function log(t){
  console.log(t);
}

function sendChanges(eventname,message){
  try{
    var a = {
      eventName:eventname,
      value:message
    }
    content.contentWindow.postMessage(a,'*');
     a = null;
     //log(event);
   }catch(err){
     log(err);
   }
}

window.addEventListener('message', function(event){
  //log(event);
  if(event.data.eventName === "showNotify"){
    //notify(event.data.value);
    Explorer.notification(event.data.value);
  }else if(event.data.eventName === "openbell"){
    labelc();
  }
}, false);

function mediasession(){
navigator.mediaSession.setActionHandler('pause', function(){

  log('Paused');

  navigator.mediaSession.playbackState = "paused";
  if(document.pictureInPictureElement){
    document.pictureInPictureElement.pause();
  }
});

navigator.mediaSession.setActionHandler('play',splay);

function splay(){
  log('Playing');
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
    overlay.style.display = 'none';
    //log(getSizeToken(4000));
    home.classList.add("active");

    if('Notification' in window){
      log('Notification Web API is supported. ');
      Explorer.notification('Notification Web API is supported. ');
    }else{
      log('Notification Web API is not supported. ');
      Explorer.notification('Notification Web API is not supported. ');
    }
    if(!('pictureInPictureEnabled' in document)){
      log('The Picture-in-Picture Web API is not available.');
      Explorer.notification('The Picture-in-Picture Web API is not available.');
    }else if(!document.pictureInPictureEnabled){
      log('The Picture-in-Picture Web API is disabled. ');
      Explorer.notification('The Picture-in-Picture Web API is disabled. ');
    }else if('pictureInPictureEnabled' in document){
        log('The Picture-in-Picture Web API is available. ');
        Explorer.notification('The Picture-in-Picture Web API is available. ');
        mediasession();
    }

    if('mediaSession' in navigator){
        log('Media Session Web API is supported. ');
        Explorer.notification('Media Session Web API is supported. ');
    }else{
        Explorer.notification('Media Session Web API is not supported. ');
        log('Media Session Web API is not supported. ');
    }
    updateNoti(mainNotification.getElementsByTagName('label').length);
    let arr = [home,music,video,picture,documents,files,apps];
    content.addEventListener('load',function(e){
      try{
        for(var i = 0;i<arr.length;i++){
          if(String(content.src).endsWith((arr[i].dataset.src).toString()) === true) {
            if(arr[i].classList.contains('active')){
              //log(arr[i]);
              //log(content.src);
            }else{

              //setActive(arr[i]);
            }
          }else{
            //log(arr[i].dataset.src);
          }
        }
      }catch(err){
        log(err);
      }
    });

    mainNotification.addEventListener('onlabeladded',function(event){
      sendChanges("showBell",event.detail);
      updateNoti(event.detail);
    },false);

    home.addEventListener('click',function(event){
      setActive(home);
    });

    music.addEventListener('click',function(event){
      setActive(music);
    });

    video.addEventListener('click',function(event){
      setActive(video);
    });

    picture.addEventListener('click',function(event){
      setActive(picture);
    });

    documents.addEventListener('click',function(event){
      setActive(documents);
    });

    files.addEventListener('click',function(event){
      setActive(files);
    });

    apps.addEventListener('click',function(event){
      setActive(apps);
    });

    function setActive(elem){
      if(String(content.src).endsWith(`${elem.dataset.src}`) != true){
        content.src = `${elem.dataset.src}`;
        //log(content.contentWindow);
        //content.contentWindow.history.pushState(null,document.title,location.href);
        //content.contentWindow.location.replace(`${elem.dataset.src}`);
        elem.classList.add('active');
        elem.getElementsByTagName('img')[0].src = elem.dataset.icong;
        for(var i=0;i<arr.length;i++){
          if(arr[i] === elem){

          }else{
            arr[i].classList.remove('active');
            arr[i].getElementsByTagName('img')[0].src = arr[i].dataset.iconw;
          }
        }
      }
    }
    function updateNoti(val){
      var noticount = document.getElementById('noti-count');
      var alertsvg = document.getElementById('alertsvg');
      if(val !== 0){
            noticount.style.display = 'block';
            noticount.innerText = val;
            alertsvg.classList.add('bellanimation');
      }else{
        noticount.style.display = 'none';
        noticount.innerText = 0;
        alertsvg.classList.remove('bellanimation');
      }
    }
});
function notify(txt)
{
  if(Notification.permissions === 'granted'){
    donotify(txt);
  }else{
    Notification.requestPermission()
      .then(function(result){

        if(result === 'granted'){
          log('Notification Granted');
          donotify('Hello');
      }else{
        log('Enable The Notification To Use Background Playback');
      }
      })
      .catch( (err) => {
        log(err);
      })
  }
}
function donotify(txt){
  let title = "The Title";
    let options = {
      body: 'Helo From javascript',
      icon: 'a.png'
    }
    let n = new Notification(title, options);

    n.addEventListener('show', function(ev){
      console.log('Notification Show');
    });
    n.addEventListener('close', function(ev){

    });

    //setTimeout(n.close.bind(n), 3000);
}

function getSizeToken(size){
	if (!size || size === undefined || isNaN(size)) {
      return Promise.resolve('');
    }
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = 0;
    while (size >= 1024 && i < (units.length - 1)) {
      size /= 1024;
      ++i;
    }
    var sizeDecimal = i < 2 ? Math.round(size) : Math.round(size * 10) / 10;
	return (`${sizeDecimal}${units[i]}`);
}

})(window)
