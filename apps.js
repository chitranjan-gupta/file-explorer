const appsinput = document.getElementById('upload');


function ShowHide(element) {
  if (element.style.display == 'block') {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
}

function log(t) { console.log(t); }

function isDisplayed(element) {
  if (element.style.display == 'block') {
    //Do Nothing
  } else {
    element.style.display = 'block';
  }
}

window.addEventListener('message', function (event) {
  //log(event);

}, false);


document.addEventListener('DOMContentLoaded', function (event) {
  const uploadapps = document.createElement('input');
  uploadapps.setAttribute('type', 'file');

  appsinput.onclick = function (e) {
    uploadapps.click();
  };

  uploadapps.onchange = function (e) {
    var reader = new FileReader();
    reader.onload = function (e) {
      //log(this.result);
    }
    reader.readAsDataURL(this.files[0]);
  };

});
