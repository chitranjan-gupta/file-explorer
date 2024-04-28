
class FileExplorer {
  constructor() {
    document.addEventListener('DOMContentLoaded', function (e) {
      FileExplorer.active = false;
      document.getElementById('file_item_container').addEventListener('click', FileExplorer.prototype.onMain);
      FileExplorer.filesinputElement = document.getElementById('upload');
      FileExplorer.downloadICON = document.getElementById('download');
      FileExplorer.folderICON = document.getElementById('folder');
      FileExplorer.fileICON = document.getElementById('file');
      FileExplorer.renameICON = document.getElementById('rename');
      FileExplorer.cutICON = document.getElementById('cut');
      FileExplorer.copyICON = document.getElementById('copy');
      FileExplorer.pasteCON = document.getElementById('paste');
      FileExplorer.deleteICON = document.getElementById('delete');
      FileExplorer.refreshICON = document.getElementById('refresh');
      FileExplorer.searchICON = document.getElementById('search_file_btn');

      FileExplorer.searchICON.addEventListener('mousedown', function (e) {
        event.preventDefault();
        if (document.getElementById('search_file_input').value != null && document.getElementById('search_file_input').value != "") {
          var i = FileExplorer.prototype.search(document.getElementById('search_file_input').value, "ALL");
          if (i) {
            FileExplorer.prototype.onSelect(i.parentElement);
            FileExplorer.active = false;
          } else {
            FileExplorer.prototype.sendToMain("ShowAlert", 1, "Does Not Exists!");
          }
        }
      });
      FileExplorer.folderICON.addEventListener('mousedown', FileExplorer.prototype.newFolder);
      FileExplorer.fileICON.addEventListener('mousedown', FileExplorer.prototype.newFile);
      FileExplorer.renameICON.addEventListener('mousedown', FileExplorer.prototype.rename);

      const uploadfiles = document.createElement('input');
      uploadfiles.setAttribute('type', 'file');

      FileExplorer.filesinputElement.onclick = function (e) {
        uploadfiles.click();
      };

      uploadfiles.onchange = function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
          //log(this.result);
        }
        reader.readAsDataURL(this.files[0]);
      };
    });
  }

  onMain() {
    document.getElementById('file_item_container').childNodes.forEach(element => {
      if (element instanceof HTMLDivElement) {
        // FileExplorer.prototype.log(element);
        if (element.classList.contains('file_ren')) {
          //event.stopPropagation();
          element.classList.remove('file_ren');
          FileExplorer.active = false;
          FileExplorer.prototype.deSelect(element);
          FileExplorer.prototype.setText(element.getElementsByClassName('file_rename')[0].children[0]);
        } else if (element.classList.contains('file_createname')) {
          //event.stopPropagation();
          //event.cancelBubble = true;
          element.classList.remove('file_createname');
          FileExplorer.active = false;
          FileExplorer.prototype.deSelect(element);
          //console.log('ActiveListenr');
          FileExplorer.prototype.setNewName(element.getElementsByClassName('file_createFolder')[0].children[0]);
          //element.getElementsByClassName('file_createFolder')[0].children[0].select();
        }
      }
    });
  }

  async createFolder(folderpath, foldername, folderDate, New) {
    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'file_item');
    mainDiv.setAttribute('data-type', 'FOLDER');
    mainDiv.setAttribute('data-date', `${folderDate}`);
    mainDiv.setAttribute('onfocus', 'filexplorer.onSelect(this);');
    mainDiv.setAttribute('onblur', 'filexplorer.deSelect(this);');
    mainDiv.setAttribute('tabindex', '-1');
    mainDiv.setAttribute('path', `${folderpath}`);
    var icon = document.createElement('div');
    icon.setAttribute('class', 'file_type_icon folder_icon');
    var name = document.createElement('span');
    name.setAttribute('class', 'file_name');
    var rename = document.createElement('span');
    rename.setAttribute('class', 'file_rename');
    var reinput = document.createElement('input');
    reinput.setAttribute('type', 'text');
    reinput.setAttribute('onblur', 'filexplorer.setText(this);');
    var createF = document.createElement('span');
    createF.setAttribute('class', 'file_createFolder');
    createF.setAttribute('onmousedown', 'filexplorer.newname(this);');
    var createInput = document.createElement('input');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('placeholder', 'New Folder');
    createInput.setAttribute('onblur', 'filexplorer.setNewName(this);');
    if (New === true) {
      mainDiv.setAttribute('title', `${foldername}`);
      name.innerText = `${foldername}`;
    }
    if (New === false) {
      name.style.display = 'none';
      createF.style.display = 'block';
      mainDiv.classList.add('file_createname');
    }
    mainDiv.appendChild(icon);
    mainDiv.appendChild(name);
    rename.appendChild(reinput);
    mainDiv.appendChild(rename);
    createF.appendChild(createInput);
    mainDiv.appendChild(createF);

    return mainDiv;
  }

  async createFile(filePath, fileName, fileType, fileDate, New) {
    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'file_item');
    mainDiv.setAttribute('data-type', `${fileType}`);
    mainDiv.setAttribute('data-date', `${fileDate}`);
    mainDiv.setAttribute('onfocus', 'filexplorer.onSelect(this);');
    mainDiv.setAttribute('onblur', 'filexplorer.deSelect(this);');
    mainDiv.setAttribute('tabindex', '-1');
    mainDiv.setAttribute('path', `${filePath}`);
    var icon = document.createElement('div');
    icon.setAttribute('class', `file_type_icon ${FileExplorer.prototype.ICONSTORE(fileType)}`);
    var name = document.createElement('span');
    name.setAttribute('class', 'file_name');
    var rename = document.createElement('span');
    rename.setAttribute('class', 'file_rename');
    var reinput = document.createElement('input');
    reinput.setAttribute('type', 'text');
    reinput.setAttribute('onblur', 'filexplorer.setText(this);');
    var createF = document.createElement('span');
    createF.setAttribute('class', 'file_createFolder');
    createF.setAttribute('onmousedown', 'filexplorer.newname(this);');
    var createInput = document.createElement('input');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('placeholder', 'New Text Document');
    createInput.setAttribute('onblur', 'filexplorer.setNewName(this);');
    if (New === true) {
      mainDiv.setAttribute('title', `${fileName}`);
      name.innerText = `${fileName}`;
    }
    if (New === false) {
      name.style.display = 'none';
      createF.style.display = 'block';
      mainDiv.classList.add('file_createname');
    }
    mainDiv.appendChild(icon);
    mainDiv.appendChild(name);
    rename.appendChild(reinput);
    mainDiv.appendChild(rename);
    createF.appendChild(createInput);
    mainDiv.appendChild(createF);

    return mainDiv;
  }

  async createTreeItem(displayType, storageID, treeName, btnType) {
    var mainUL = document.createElement('ul');
    mainUL.setAttribute('class', `tree_item ${displayType}`);
    var li = document.createElement('li');
    li.setAttribute('id', `${storageID}`);
    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', `tree_leaf`);
    mainDiv.setAttribute('title', `${treeName}`);
    var btnDiv = document.createElement('div');
    btnDiv.setAttribute('class', `leaf_btn ${btnType}`);
    btnDiv.setAttribute('onclick', 'filexplorer.downOpen(this);');
    var icon = document.createElement('div');
    icon.setAttribute('class', 'leaf_folder_icon');
    var name = document.createElement('span');
    name.setAttribute('class', 'leaf_folder_name');
    name.innerText = `${treeName}`;

    mainDiv.appendChild(btnDiv);
    mainDiv.appendChild(icon);
    mainDiv.appendChild(name);

    li.appendChild(mainDiv);

    mainUL.appendChild(li);

    //return mainUL;

    document.getElementById('Interal_Storage').appendChild(mainUL);
  }

  hover(element, iconlocation) {
    element.children[0].setAttribute('src', `${iconlocation.toString()}`);
    element.style.backgroundColor = '#2baf2b';
    element.style.border = '1px solid #2baf2b';
  }

  unhover(element, iconlocation) {
    element.children[0].setAttribute('src', `${iconlocation.toString()}`);
    element.style.backgroundColor = 'white';
    element.style.border = '1px solid #00000029';
  }

  log(t) { console.log(t); }

  isDisplayed(element) {
    if (element.style.display == 'block') {
      //Do Nothing
    } else {
      element.style.display = 'block';
    }
  }

  download() {

  }

  cut() {

  }

  copy() {

  }

  paste() {

  }

  newFolder(folderpath) {
    event.preventDefault();
    event.stopPropagation();
    FileExplorer.prototype.createFolder('helo', 'Bablu', '', false).then(function (e) {
      //FileExplorer.prototype.log(e);
      document.getElementById('file_item_container').appendChild(e);
      event.preventDefault();
      e.focus({ preventScroll: true });
      //e.getElementsByClassName('file_createFolder')[0].children[0].focus({preventScroll:true});
    }, function (e) {
      FileExplorer.prototype.log(e);
    });
    // FileExplorer.prototype.log(a);
  }

  refresh() {

  }

  rename() {
    FileExplorer.active = true;
    //FileExplorer.prototype.log('yes');
    if (FileExplorer.selectedElement) {
      // console.log(FileExplorer.selectedElement);
      FileExplorer.selectedElement.getElementsByClassName('file_rename')[0].children[0].addEventListener('focus', function (e) {
        event.stopPropagation();
        FileExplorer.prototype.remListFromItemConta(FileExplorer.prototype.onMain, 'click');
      });
      FileExplorer.selectedElement.classList.add('file_ren');
      FileExplorer.selectedElement.getElementsByClassName('file_name')[0].style.display = 'none';
      FileExplorer.selectedElement.getElementsByClassName('file_createFolder')[0].style.display = 'none';
      FileExplorer.selectedElement.getElementsByClassName('file_rename')[0].style.display = 'block';
      FileExplorer.selectedElement.getElementsByClassName('file_rename')[0].children[0].value = '';

      // FileExplorer.selectedElement.getElementsByClassName('file_rename')[0].children[0].addEventListener('blur',FileExplorer.prototype.setText,false);
    }
  }

  remListFromItemConta(func, evnt) {
    event.stopPropagation();
    //event.preventDefault();
    document.getElementById('file_item_container').removeEventListener(evnt, func);
    //console.log('removedListener');
  }

  addListFromItemConta(func, evnt) {
    event.stopPropagation();
    //event.preventDefault();
    document.getElementById('file_item_container').addEventListener(evnt, func);
    //console.log('removedListener');
  }

  newname(element) {
    // FileExplorer.prototype.log(element);
    //event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    FileExplorer.active = true;
    //console.log('NewName');
    element.parentElement.getElementsByClassName('file_rename')[0].style.display = 'none';
    element.parentElement.getElementsByClassName('file_name')[0].style.display = 'none';
    element.style.display = 'block';
    element.children[0].addEventListener('focus', function (e) {
      //document.getElementById('file_item_container').removeEventListener('click',FileExplorer.prototype.onMain);
      //event.preventDefault();
      event.stopPropagation();
      event.cancelBubble = true;

      FileExplorer.prototype.remListFromItemConta(FileExplorer.prototype.onMain, 'click');
      //console.log('NewName');
      //element.parentElement.classList.add('file_createname');
    });
  }

  setNewName(element) {
    event.stopPropagation();
    // console.log('SETNEWNAME');
    if (element) {
      if (element.value != null && element.value != "") {
        if (FileExplorer.prototype.search(element.value, element.parentElement.parentElement.dataset.type.toString()) !== 1) {

          element.parentElement.parentElement.getElementsByClassName('file_name')[0].innerText = element.value.toString();
          element.parentElement.parentElement.setAttribute('title', element.value.toString());
          element.parentElement.style.display = 'none';
          element.parentElement.parentElement.getElementsByClassName('file_name')[0].style.display = 'block';
          element.parentElement.parentElement.classList.remove('file_createname');
          FileExplorer.active = false;
          FileExplorer.prototype.deSelect(element.parentElement.parentElement);
          FileExplorer.prototype.addListFromItemConta(FileExplorer.prototype.onMain, 'click');
        }
      } else {

        element.parentElement.parentElement.getElementsByClassName('file_name')[0].innerText = `New ${element.parentElement.parentElement.dataset.type.toLowerCase()}`;
        element.parentElement.parentElement.setAttribute('title', `New ${element.parentElement.parentElement.dataset.type.toLowerCase()}`);
        element.parentElement.style.display = 'none';
        element.parentElement.parentElement.getElementsByClassName('file_name')[0].style.display = 'block';
        element.parentElement.parentElement.classList.remove('file_createname');
        FileExplorer.active = false;
        FileExplorer.prototype.deSelect(element.parentElement.parentElement);
        FileExplorer.prototype.addListFromItemConta(FileExplorer.prototype.onMain, 'click');
      }
    }
  }

  setText(element) {
    event.stopPropagation();
    if (element) {
      if (element.value != null && element.value != "") {
        if (FileExplorer.prototype.search(element.value, element.parentElement.parentElement.dataset.type.toString()) !== 1) {
          element.parentElement.parentElement.getElementsByClassName('file_name')[0].innerText = element.value.toString();
          element.parentElement.parentElement.setAttribute('title', element.value.toString());
          element.parentElement.parentElement.getElementsByClassName('file_rename')[0].style.display = 'none';
          element.parentElement.parentElement.getElementsByClassName('file_name')[0].style.display = 'block';
          element.parentElement.parentElement.classList.remove('file_ren');
          FileExplorer.active = false;
          if (FileExplorer.selectedElement) {
            FileExplorer.prototype.deSelect(FileExplorer.selectedElement);
          }
          FileExplorer.prototype.addListFromItemConta(FileExplorer.prototype.onMain, 'click');
        }
      } else {
        element.parentElement.parentElement.getElementsByClassName('file_rename')[0].style.display = 'none';
        element.parentElement.parentElement.getElementsByClassName('file_name')[0].style.display = 'block';
        element.parentElement.parentElement.classList.remove('file_ren');
        FileExplorer.active = false;
        if (FileExplorer.selectedElement) {
          FileExplorer.prototype.deSelect(FileExplorer.selectedElement);
        }
        FileExplorer.prototype.addListFromItemConta(FileExplorer.prototype.onMain, 'click');
      }
    }

  }

  deleteITEM() {

  }

  newFile() {
    event.preventDefault();
    event.stopPropagation();
    FileExplorer.prototype.createFile('Bablu', 'Bablu', 'TEXT', 'Saturday', false).then(function (e) {
      //FileExplorer.prototype.log(e);
      document.getElementById('file_item_container').appendChild(e);
      event.preventDefault();
      e.focus({ preventScroll: false });
    }, function (e) {
      FileExplorer.prototype.log(e);
    });
    // FileExplorer.prototype.log(a);
  }

  search(text, fileType) {
    var a;

    if (fileType.trim() === "ALL") {
      a = document.getElementById('file_item_container').getElementsByClassName('file_name');
      for (var i = 0; i < a.length; i++) {
        if (a[i].innerText === text.trim()) {
          return a[i];
        }
      }
    } else {
      a = document.getElementById('file_item_container').getElementsByClassName(FileExplorer.prototype.ICONSTORE(fileType.trim()));
      // FileExplorer.prototype.log(a);
      for (var i = 0; i < a.length; i++) {
        if (a[i].parentElement.getElementsByClassName('file_name')[0].innerText === text.trim()) {
          FileExplorer.prototype.sendToMain("ShowAlert", 1, "Already Exists!");
          return 1;
        }
      }
    }
    //FileExplorer.prototype.sendToMain();
  }

  sendToMain(eventName, eventDetail, eventData) {
    const bc = new BroadcastChannel('dialog');
    var a = {
      event: eventName,
      detail: eventDetail,
      data: eventData
    };
    bc.postMessage(a);
  }

  async hideFolderView(element) {
    for (var i = 0; i < element.length; i++) {
      if (element[i] instanceof HTMLUListElement) {
        if (element[i].classList.contains('displaynone')) {
          element[i].classList.remove('displaynone');
          element[i].classList.add('displayblock');
        }
      }
    }
  }

  async showFolderView(element) {
    for (var i = 0; i < element.length; i++) {
      if (element[i] instanceof HTMLUListElement) {
        if (element[i].classList.contains('displayblock')) {
          element[i].classList.remove('displayblock');
          element[i].classList.add('displaynone');
        }
      }
    }
  }
  async checkPresence(element) {
    // for(var i = 0;i < element.length; i++){
    //   if(element[i] instanceof HTMLUListElement){
    //     return 0;
    //   }
    // }
    return 0;
  }
  async downOpen(element) {
    if (element.classList.contains('downopen')) {
      element.classList.remove('downopen');
      element.classList.add('downclose');
      //log(element.parentElement.parentElement.getElementsByTagName('ul'));
      FileExplorer.prototype.hideFolderView(element.parentElement.parentElement.children);
    } else {
      if (element) {
        if (element.classList.contains('downclose')) {
          element.classList.remove('downclose');
        }
        element.classList.add('downopen');
        FileExplorer.prototype.showFolderView(element.parentElement.parentElement.getElementsByTagName('ul'));
      }
    }
  }
  ICONSTORE(type) {
    if (type) {
      switch (type) {
        case "FOLDER":
          return "folder_icon";
        case "IMAGE":
          return "file_img_icon";
        case "VIDEO":
          return "file_video_icon";
        case "MUSIC":
          return "file_song_icon";
        case "PDF":
          return "file_pdf_icon";
        case "HTML":
          return "file_html_icon";
        case "CSS":
          return "file_css_icon";
        case "COMPRESSED":
          return "file_zip_icon";
        default:
          return "file_blank_icon";
      }
    } else {
      return "file_blank_icon";
    }
  }
  updateFileView(fileType, fileName, fileDate) {
    document.getElementById('file_icon_view').className = '';
    document.getElementById('file_icon_view').classList.add(FileExplorer.prototype.ICONSTORE(fileType));
    document.getElementById('file_name_view').innerText = (fileName || 'Android');
    document.getElementById('file_date_view').innerText = (fileDate || Date.now().toString());
  }
  imgdeactive(element) {
    element.classList.remove('operationimgdeactive');
  }

  imgactive1(element) {
    element.classList.add('operationimgdeactive');
  }

  imgactive(element) {
    element.classList.add('operationimgactive');
  }

  imgdeactive1(element) {
    element.classList.remove('operationimgactive');
  }

  enable(element) {
    element.classList.remove('disableddiv');
  }

  disable(element) {
    element.classList.add('disableddiv');
  }

  select() {
    FileExplorer.prototype.imgactive(FileExplorer.downloadICON);
    FileExplorer.prototype.imgactive(FileExplorer.renameICON);
    FileExplorer.prototype.imgactive(FileExplorer.cutICON);
    FileExplorer.prototype.imgactive(FileExplorer.deleteICON);
    FileExplorer.prototype.imgactive(FileExplorer.copyICON);
    FileExplorer.prototype.disable(FileExplorer.searchICON);

    FileExplorer.prototype.imgdeactive(FileExplorer.downloadICON);
    FileExplorer.prototype.imgdeactive(FileExplorer.renameICON);
    FileExplorer.prototype.imgdeactive(FileExplorer.cutICON);
    FileExplorer.prototype.imgdeactive(FileExplorer.deleteICON);
    FileExplorer.prototype.imgdeactive(FileExplorer.copyICON);
  }

  deselect() {
    FileExplorer.prototype.imgdeactive1(FileExplorer.downloadICON);
    FileExplorer.prototype.imgdeactive1(FileExplorer.renameICON);
    FileExplorer.prototype.imgdeactive1(FileExplorer.cutICON);
    FileExplorer.prototype.imgdeactive1(FileExplorer.deleteICON);
    FileExplorer.prototype.imgdeactive1(FileExplorer.copyICON);
    FileExplorer.prototype.enable(FileExplorer.searchICON);
    FileExplorer.prototype.imgactive1(FileExplorer.downloadICON);
    FileExplorer.prototype.imgactive1(FileExplorer.renameICON);
    FileExplorer.prototype.imgactive1(FileExplorer.cutICON);
    FileExplorer.prototype.imgactive1(FileExplorer.deleteICON);
    FileExplorer.prototype.imgactive1(FileExplorer.copyICON);
  }
  onSelect(element) {
    event.preventDefault();
    event.stopPropagation();
    if (element) {
      element.classList.add('selected');
      FileExplorer.prototype.select();
      FileExplorer.selectedElement = '';
      FileExplorer.selectedElement = element;
      FileExplorer.prototype.updateFileView(element.dataset.type.toString(), element.children[1].innerText.toString(), ('Sunday'));
    }
    //.event.srcElement.dataset.date.toString() ||
    //FileExplorer.prototype.log(FileExplorer.selectedElement);
  }
  deSelect(element) {
    // FileExplorer.prototype.log('yes');
    event.preventDefault();
    event.stopPropagation();
    if (element) {
      if (FileExplorer.active === false) {
        element.classList.remove('selected');
        FileExplorer.prototype.deselect();
        FileExplorer.selectedElement = '';
        FileExplorer.active = false;
      }
    }
  }

  ShowHide(element) {
    if (element.style.display == 'block') {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  }
}

var filexplorer = new FileExplorer();

window.addEventListener('message', function (event) {
  //log(event);

}, false);


document.addEventListener('DOMContentLoaded', function (event) {

});
