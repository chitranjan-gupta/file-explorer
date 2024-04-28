
document.addEventListener('DOMContentLoaded',function(e){
  d();
});

function d(){
  const labelArray = document.getElementById('slider').children;
  const active = document.getElementById('slide4');
  //console.log(labelArray);
  try{
    if(active instanceof HTMLLabelElement){
        var index = getIndex(labelArray,active);
        var indexX = index;
        var indexY = index;
        var sno = 0;
        var nno = 3;
        if(index !== -1){

          //console.log(index)
          active.className = '';
          active.classList.add('active');
          for(var i = indexX - 1;i >= 0;i--){
            labelArray[i].className = '';
            if(sno !== 3){
              sno++;
              labelArray[i].classList.add(`slide${sno}`);
            }else{
              labelArray[i].classList.add(`slide3`);
            }
          }

          for(var j = indexY + 1;j < labelArray.length;j++){
            labelArray[j].className = '';
            if(nno != 6){
              nno++;
              labelArray[j].classList.add(`slide${nno}`);
            }else{
              labelArray[j].classList.add(`slide6`);
            }
          }
        }
    }
  }catch(e){
    console.log(e);
  }
}

function c(){
  const labelArray = document.getElementById('slider').children;
  //console.log(labelArray);
  try{
    if(this.event.srcElement instanceof HTMLLabelElement){
      if(!(this.event.srcElement.classList.contains('active'))){
        var index = getIndex(labelArray,this.event.srcElement);
        var indexX = index;
        var indexY = index;
        var sno = 0;
        var nno = 3;
        var preElement = false;
        var nexElement = false;
        if(index !== -1){
          if(labelArray[index - 1].classList.contains('active')){
            preElement = true;
          }
          if(labelArray[index + 1].classList.contains('active')){
            nexElement = true;
          }
          this.event.srcElement.className = '';
          this.event.srcElement.classList.add('active');
          if(preElement === true){
            beforeElement(indexX);
            afterElement(indexY);
          }
          if(nexElement === true){
            afterElement(indexY);
            beforeElement(indexX);
          }
          function beforeElement(indexX){
            for(var i = indexX - 1;i >= 0;i--){
              labelArray[i].className = '';
              if(sno !== 3){
                sno++;
                labelArray[i].classList.add(`slide${sno}`);
              }else{
                labelArray[i].classList.add(`slide3`);
                if(document.getElementsByClassName('slide3').length > 0){
                  labelArray[i].className = '';
                  labelArray[i].classList.add('slide6');
                  labelArray[i].after(document.getElementsByClassName('slide6')[0]);
                }
              }
            }
          }

          function afterElement(indexY){
            for(var j = indexY + 1;j < labelArray.length;j++){
              labelArray[j].className = '';
              if(nno != 6){
                nno++;
                labelArray[j].classList.add(`slide${nno}`);
              }else{
                labelArray[j].classList.add(`slide6`);
                if(document.getElementsByClassName('slide6').length > 0){
                  labelArray[j].className = '';
                  labelArray[j].classList.add('slide3');
                  labelArray[j].after(document.getElementsByClassName('slide3')[0]);
                }
              }
            }
          }

        }
      }
    }
  }catch(e){
    console.log(e);
  }
}
function getIndex(array,object){
  for(var i = 0; i < array.length;i++){
    if(array[i] === object){
      return i;
    }
  }
  return -1;
}

function less(n){
  if(n >= 0){
    return n;
  }
}

function great(n,no){
  if(n < no){
    return n;
  }
}
