class BigScreen {

  imageElement = null;
  fullButton = null;
  fullScrElement = null;
  zoominbut = null;
  zoomoutbut = null;
  rotateClockbut = null;
  rotateAntiClockbut = null;
  static rotateAngle = [90, 180, 270, 0];
  static angleNo = 0;
  worker = null;

  constructor(imgelemid, fButid, felemid, zoinbut, zooutbut, roCloBut, roAnCloBut, ext) {
    const overlay = document.getElementById('overlay');
    window.addEventListener('load', function (e) {
      overlay.style.display = 'none';
    }, false);

    function fadeOut() {

      document.getElementById('imgname').classList.add("setopacity");
      document.getElementById('previous').classList.add("setopacity");
      document.getElementById('next').classList.add("setopacity");
      document.getElementById('operation').classList.add("setopacity");

      document.getElementById('imgname').classList.add("fadeout");
      document.getElementById('previous').classList.add("fadeout");
      document.getElementById('next').classList.add("fadeout");
      document.getElementById('operation').classList.add("fadeout");

      document.getElementById('imgname').classList.remove("fadein");
      document.getElementById('previous').classList.remove("fadein");
      document.getElementById('next').classList.remove("fadein");
      document.getElementById('operation').classList.remove("fadein");
    }

    var x;

    function fadeIn() {
      document.getElementById('imgname').classList.remove("fadeout");
      document.getElementById('previous').classList.remove("fadeout");
      document.getElementById('next').classList.remove("fadeout");
      document.getElementById('operation').classList.remove("fadeout");

      document.getElementById('imgname').classList.remove("setopacity");
      document.getElementById('previous').classList.remove("setopacity");
      document.getElementById('next').classList.remove("setopacity");
      document.getElementById('operation').classList.remove("setopacity");

      document.getElementById('imgname').classList.add("fadein");
      document.getElementById('previous').classList.add("fadein");
      document.getElementById('next').classList.add("fadein");
      document.getElementById('operation').classList.add("fadein");

      if (x) clearTimeout(x);
      x = setTimeout(fadeOut, 600);
    }

    document.addEventListener('mousemove', fadeIn, false);

    document.addEventListener('DOMContentLoaded', function (e) {
      BigScreen.imageElement = document.getElementById(imgelemid);
      BigScreen.zoominbut = document.getElementById(zoinbut);
      BigScreen.zoomoutbut = document.getElementById(zooutbut);
      BigScreen.fullButton = document.getElementById(fButid);
      BigScreen.fullScrElement = document.getElementById(felemid);
      BigScreen.rotateClockbut = document.getElementById(roCloBut);
      BigScreen.rotateAntiClockbut = document.getElementById(roAnCloBut);

      BigScreen.imageElement.addEventListener('load', function (e) {
        //BigScreen.imageElement.src = './src/assets/icons/blank.png';
      });

      BigScreen.fullButton.addEventListener('click', function (e) {
        BigScreen.fullScreen(BigScreen.fullScrElement);
      }, false);
      BigScreen.zoominbut.addEventListener('click', function (e) {
        BigScreen.zoomin(BigScreen.imageElement);
      }, false);
      BigScreen.zoomoutbut.addEventListener('click', function (e) {
        BigScreen.zoomout(BigScreen.imageElement);
      }, false);
      BigScreen.rotateClockbut.addEventListener('click', function (e) {
        BigScreen.rotateClock(BigScreen.imageElement);
      }, false);
      BigScreen.rotateAntiClockbut.addEventListener('click', function (e) {
        BigScreen.rotateAntiClock(BigScreen.imageElement);
      }, false);
      BigScreen.imageElement.onmousedown = function (event) {
        BigScreen.imageElement.style.cursor = 'url(./src/assets/icons/hand2.gif),auto';
        let shiftX = event.clientX - BigScreen.imageElement.getBoundingClientRect().left;
        let shiftY = event.clientY - BigScreen.imageElement.getBoundingClientRect().top;

        //moveAt(event.pageX, event.pageY);

        document.removeEventListener('mousemove', fadeIn, false);

        function moveAt(pageX, pageY) {
          BigScreen.imageElement.style.left = pageX - shiftX + 'px';
          BigScreen.imageElement.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
          //moveAt(event.clientX,event.clientY);
          //moveAt(event.screenX,event.screenY);
        }
        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          document.addEventListener('mousemove', fadeIn);
          BigScreen.imageElement.style.cursor = 'url(./src/assets/icons/hand1.gif),auto';
          BigScreen.imageElement.onmouseup = null;
        };
      };
      BigScreen.imageElement.ondragstart = function () {
        return false;
      };
    }, false);
    document.getElementById(ext).addEventListener('click', function (e) {
      //window.location = 'index.html';
      BigScreen.connectServer('ws://localhost:3000');
    }, false);
  }

  static connectServer(url) {
    try {
      BigScreen.worker = new Worker(URL.createObjectURL(new Blob(["(" + worker_function.toString() + ")()"], { type: 'text/javascript' })));
      BigScreen.worker.postMessage(url);
      BigScreen.worker.addEventListener('message', (e) => {
        //BigScreen.log(e);
        // document.getElementById('container').classList.add('disablediv');
        var image = new Image();
        image.onload = function () {
          BigScreen.imageElement.src = this.src;
          document.getElementById('imgname').innerText = e.data.name;
          // document.getElementById('container').classList.remove('disablediv');
        };
        image.src = e.data.data;
      });

      BigScreen.worker.addEventListener('error', (e) => {
        BigScreen.log(e);
      });
    } catch (e) {
      BigScreen.log(e);
    }
  }

  static log(t) {
    console.log(t);
  }

  static fullScreen(element) {
    try {

      if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
          BigScreen.log(err);
          return;
        });
      } else {
        document.exitFullscreen();
        return;
      }
      return;
    } catch (err) {
      BigScreen.log(err);
    }
  }

  static zoomin(element) {
    try {
      var elemW = window.getComputedStyle(element).getPropertyValue('width');
      var elemH = window.getComputedStyle(element).getPropertyValue('height');
      element.style.width = `${Number(elemW.substring(0, (elemW.length - 2))) + 10}px`;
      element.style.height = `${Number(elemH.substring(0, (elemH.length - 2))) + 10}px`;
    } catch (e) {
      BigScreen.log(e);
    }
  }

  static zoomout(element) {
    try {
      var elemW = window.getComputedStyle(element).getPropertyValue('width');
      var elemH = window.getComputedStyle(element).getPropertyValue('height');
      element.style.width = `${Number(elemW.substring(0, (elemW.length - 2))) - 10}px`;
      element.style.height = `${Number(elemH.substring(0, (elemH.length - 2))) - 10}px`;
    } catch (e) {
      BigScreen.log(e);
    }
  }

  static rotateClock(element) {
    try {
      if (BigScreen.angleNo < BigScreen.rotateAngle.length) {
        element.style.transform = 'rotate(' + BigScreen.rotateAngle[BigScreen.angleNo] + 'deg)';
        BigScreen.angleNo++;
      } else {
        BigScreen.angleNo = 0;
        element.style.transform = 'rotate(' + BigScreen.rotateAngle[BigScreen.angleNo] + 'deg)';
      }
    } catch (e) {
      BigScreen.log(e);
    }
  }

  static rotateAntiClock(element) {
    try {
      if (BigScreen.rotateAngle[BigScreen.angleNo] > -1 && BigScreen.rotateAngle[BigScreen.angleNo] < BigScreen.rotateAngle.length) {
        BigScreen.angleNo--;
        element.style.transform = 'rotate(' + BigScreen.rotateAngle[BigScreen.angleNo] + 'deg)';
      } else {
        BigScreen.angleNo = 3;
        element.style.transform = 'rotate(' + BigScreen.rotateAngle[BigScreen.angleNo] + 'deg)';
      }
    } catch (e) {
      BigScreen.log(e);
    }
  }
}

new BigScreen('pic', 'desktop', 'container', 'zoomin', 'zoomout', 'rclock', 'ranticlock', 'eclose');
