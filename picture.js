const imageinput = document.getElementById('upload');
const imcontainer = document.getElementById('imcontainer');
const imalbumcontainer = document.getElementById('imagealbum');
const downloadsvg = document.getElementById('downloadsvg');
const deletesvg = document.getElementById('deletesvg');
const refreshsvg = document.getElementById('refreshsvg');
var selectedimage = [];
var selectedno = 0;

const selectall = document.getElementById('selectall');
const bc = new BroadcastChannel('dialog');

bc.onmessage = function(ev){
  //log(ev);
  if(ev.data.event === 'Yes' && ev.data.detail === 'Sure'){
    //log(selectedimage);
    for(var i = 0; i < selectedimage.length; i++){
      selectedimage[i].parentElement.parentElement.classList.remove("addflyin");
      selectedimage[i].parentElement.parentElement.classList.add("removeimage");
    }
    kuact();
    selectall.checked = false;
    selectedno = 0;
    selectedimage.splice(0, selectedimage.length);
    //log(selectedimage);
    setTimeout(function(e){
      while(imcontainer.getElementsByClassName("removeimage").length != 0){
        imcontainer.removeChild(imcontainer.getElementsByClassName("removeimage")[0]);
      }
    },1000);
    //log(selectedimage);
  }else if(ev.data.event === 'No' && ev.data.detail === 'Exit'){

  }
}

async function selectalls(){
  if(selectall.checked == true && imcontainer.getElementsByClassName("box").length != 0){
    selectall.checked = true;
    ukact();
    //log(selectedimage);
    selectedimage.splice(0,selectedimage.length);
    selectedno = 0;
    //log(selectedimage);
    for(var i = 0;i < imcontainer.getElementsByClassName('sinput').length;i++){
      imcontainer.getElementsByClassName('sinput')[i].checked = true;
      imcontainer.getElementsByClassName('sinput')[i].parentElement.children[1].classList.add("disableddiv");
      imcontainer.getElementsByClassName('sinput')[i].parentElement.classList.add("descalediv");
      imcontainer.getElementsByClassName('sinput')[i].parentElement.parentElement.classList.remove("boxhover");
      selectedimage[selectedno] = imcontainer.getElementsByClassName('sinput')[i];
      selectedno++;
      //log(i);
    }
    //log(selectedimage);
  }else{
    if(imcontainer.getElementsByClassName('box').length != 0){
    selectall.checked = false;
    kuact();
    selectedimage.splice(0,selectedimage.length);
    selectedno = 0;
    //log(selectedimage);
    for(var i = 0;i < imcontainer.getElementsByClassName('sinput').length;i++){
      imcontainer.getElementsByClassName('sinput')[i].checked = false;
      imcontainer.getElementsByClassName('sinput')[i].parentElement.children[1].classList.remove("disableddiv");
      imcontainer.getElementsByClassName('sinput')[i].parentElement.classList.remove("descalediv");
      imcontainer.getElementsByClassName('sinput')[i].parentElement.parentElement.classList.add("boxhover");
      //log(i);
    }
  }else{
    selectall.checked = false;
  }
}
}

selectall.addEventListener('click',selectalls);

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

function ShowHide(element){
  if(element.style.display == 'block'){
    element.style.display = 'none';
  }else{
    element.style.display = 'block';
  }
}

function log(t){console.log(t);}

function isDisplayed(element){
  if(element.style.display == 'block'){
      //Do Nothing
  }else{
    element.style.display = 'block';
  }
}

var imageExplorer = {
  newimage:async function(){
    if(imcontainer.getElementsByClassName('box').length == 1 || selectall.checked == true){
      selectall.checked = false;
      //log(selectedimage);
    }
    var box = document.createElement('div');
      box.setAttribute('class','box');
      box.classList.add("boxhover");
      box.classList.add("addflyin");
    var imgBox = document.createElement('div');
        imgBox.setAttribute('class','imgBox');
    var ima = document.createElement('IMG');
      ima.src = "./src/assets/icons/default-album-cover.png";
    var details = document.createElement('div');
      details.setAttribute('class','details');
      details.classList.add("scalediv");
    var ukinput = document.createElement('input');
      ukinput.setAttribute('type','checkbox');
      ukinput.classList.add("sinput");
      ukinput.setAttribute('onclick','ucheckbox();');
    var func = document.createElement('div');
      func.setAttribute('class','func');
    var downimage = document.createElement('IMG');
      downimage.setAttribute('class','downimage');
      downimage.setAttribute('alt','Download Image');
      downimage.setAttribute('src','./src/assets/icons/down-white.svg');
      downimage.setAttribute('onclick','downimage();');
      downimage.setAttribute('onmouseover','hover(this);');
      downimage.setAttribute('onmouseout','unhover(this);');

    var fullimage = document.createElement('IMG');
      fullimage.setAttribute('class','fullimage');
      fullimage.setAttribute('alt','Full Screen Image');
      fullimage.setAttribute('src','./src/assets/icons/full-white.svg');
      fullimage.setAttribute('onclick','fullimage();');
      fullimage.setAttribute('onmouseover','hover1(this);');
      fullimage.setAttribute('onmouseout','unhover1(this);');

    var delimage = document.createElement('IMG');
        delimage.setAttribute('class','deimage');
        delimage.setAttribute('alt','Delete Image');
        delimage.setAttribute('src','./src/assets/icons/del-white.svg');
        delimage.setAttribute('onclick','delimage();');
        delimage.setAttribute('onmouseover','hover2(this);');
        delimage.setAttribute('onmouseout','unhover2(this);');

    func.appendChild(downimage);
    func.appendChild(fullimage);
    func.appendChild(delimage);
    details.appendChild(ukinput);
    details.appendChild(func);
    imgBox.appendChild(ima);
    box.appendChild(imgBox);
    box.appendChild(details);
    imcontainer.appendChild(box);

    box = null;
    imgBox = null;
    ima = null;
    details = null;
    func = null;
    downimage = null;
    fullimage = null;
    delimage = null;
    ukinput = null;
  },

  newimagealbum:function(){
    var box = document.createElement('div');
      box.setAttribute('class','box');
    var imgBox = document.createElement('div');
        imgBox.setAttribute('class','imgBox');
    var ima = document.createElement('IMG');
      ima.src = "./src/assets/icons/default-album-cover.png";
    var details = document.createElement('div');
      details.setAttribute('class','details');
    var alname = document.createElement('div');
      alname.setAttribute('class','alname');
      alname.innerHTML = "Raja(102)";

    details.appendChild(alname);
    imgBox.appendChild(ima);
    box.appendChild(imgBox);
    box.appendChild(details);
    imalbumcontainer.appendChild(box);

    box = null;
    imgBox = null;
    ima = null;
    details = null;
    alname = null;
  }
};

window.addEventListener('message', function(event){
  //log(event);

}, false);

async function downimage(){
  //log(this.event.srcElement.parentElement.parentElement.parentElement.children[0].children[0].currentSrc);
  try{
    var a = document.createElement('a');
      a.href = this.event.srcElement.parentElement.parentElement.parentElement.children[0].children[0].currentSrc;
      a.download = `IMG-${Date.now()}`;
      document.body.appendChild(a);
      a.click();
  // fetch(`${this.event.srcElement.parentElement.parentElement.parentElement.children[0].children[0].currentSrc}`)
  //   .then(response => response.blob())
  //   .then(blob => {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //       const image = new Image();
  //       image.src = reader.result;
  //     });
  //     reader.readAsDataURL(blob);
  //   })
  //   .catch(err =>{
  //     log(err);
  //   });
  }catch(e){
    log(e);
  }
}

async function fullimage(){
  log(this.event.srcElement.parentElement.parentElement.parentElement.children[0].children[0].currentSrc);
  try{
  // fetch(`${this.event.srcElement.parentElement.parentElement.parentElement.children[0].children[0].currentSrc}`)
  //   .then(response => response.blob())
  //   .then(blob => {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //       const image = new Image();
  //       image.src = reader.result;
  //     });
  //     reader.readAsDataURL(blob);
  //   })
  //   .catch(err =>{
  //     log(err);
  //   });
  }catch(e){
    log(e);
  }
}

async function delimage(){
  //log(this.event.srcElement.parentElement.parentElement.parentElement.parentNode);
  var a = this.event.srcElement.parentElement.parentElement.parentElement;
  a.classList.remove("addflyin");
  a.classList.add("removeimage");
  setTimeout(function(){
    imcontainer.removeChild(a);
    a = null;
  },1000);
}

function ucheckbox(){
  //log(this.event);
  //log(this.event.srcElement.checked);
  var a = this.event.srcElement;
  if(a.checked == true){
    //log('Selected');
    //log(selectedno);
    ukact();
    selectedimage[selectedno] = a;
    selectedno++;
    if(imcontainer.getElementsByClassName("box").length === 1 || imcontainer.getElementsByClassName("box").length === selectedimage.length){
      selectall.checked = true;
    }
    a.nextElementSibling.classList.add("disableddiv");
    a.parentElement.classList.add("descalediv");
    a.parentElement.parentElement.classList.remove("boxhover");
  }else{
    //log('Not Selected');
    if(selectedno != 0){
      var inD = getIndex(selectedimage,a);
      if(inD != -1){
        //log('Yes');
        selectedimage.splice(inD, 1);
        //log(selectedimage);
        selectedno--;
        if(imcontainer.getElementsByClassName("box").length === 1 || imcontainer.getElementsByClassName("box").length !== selectedimage.length){
          selectall.checked = false;
        }
        a.nextElementSibling.classList.remove("disableddiv");
        a.parentElement.classList.remove("descalediv");
        a.parentElement.parentElement.classList.add("boxhover");
        if(selectedno == 0){
          kuact();
        }
      }// else{
      //   log('no');
      // }
    }else{
      kuact();
    }
  }
}

function getIndex(array,object){
  if(array.length != 0){
  for(var i = 0;i < array.length;i++){
    if(array[i] == object){
      return i;
    }
  }
  return -1;
  }
}

function hover(element){
  element.setAttribute('src','./src/assets/icons/down-green.svg');
}

function unhover(element){
  element.setAttribute('src','./src/assets/icons/down-white.svg');
}

function hover1(element){
  element.setAttribute('src','./src/assets/icons/full-green.svg');
}

function unhover1(element){
  element.setAttribute('src','./src/assets/icons/full-white.svg');
}

function hover2(element){
  element.setAttribute('src','./src/assets/icons/del-green.svg');
}

function unhover2(element){
  element.setAttribute('src','./src/assets/icons/del-white.svg');
}

document.addEventListener('DOMContentLoaded',function(event){

  const uploadimage = document.createElement('input');
        uploadimage.setAttribute('type','file');

  imageinput.onclick = function(e){
    uploadimage.click();
  };

  uploadimage.onchange = function(e){
    var reader = new FileReader();
      reader.onload = function(e){
        //log(this.result);
      }
      reader.readAsDataURL(this.files[0]);
  };

});
