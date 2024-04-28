(function(){
  
  function log(t){console.log(t);}

  // window.addEventListener('message', function(event){
  //
  // }, false);

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

  // async function sendChange(eventname,message){
  //   try{
  //     /*var myEvent = new CustomEvent('my_event', {
  //       detail: {url: 'some url'}
  //     });*/
  //   //window.parent.dispatchEvent(myEvent);
  //   var a = {
  //     eventName:eventname,
  //     value:message

  //   };
  //   window.parent.postMessage(a, "*");
  //   // window.parent.hello("Hello My Self");
  // }catch(err){
  //   log(err);
  // }
  // }

  document.addEventListener('DOMContentLoaded',function(event){

  });

})()
