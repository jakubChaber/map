class myApp{
    paths    = document.querySelectorAll('#MAP path');
    products = [] ;
    choosenProduct;
    init     = function(){

                    const myHeaders = new Headers();
                    const myRequest = new Request('products.json', {
                      method: 'GET',
                      headers: myHeaders,
                      mode: 'cors',
                      cache: 'default',
                    });

                    fetch(myRequest)
                    .then(response => response.json())
                    .then(data => {
                        this.products = data;
                    })
                }
  }

  const APP        = new myApp;
  const arrowLeft  = document.querySelector('.arrowLeft');
  const arrowRight = document.querySelector('.arrowRight');

  APP.init() ;

arrowLeft.addEventListener("click",scrollToLeft);
arrowRight.addEventListener("click",scrollToRight);




APP.paths.forEach(_path => {
  _path.addEventListener('click',(ev)=>{
    
    let index          = ev.target.id;
    APP.choosenProduct = APP.products[index];

    addBlocks(APP.choosenProduct);
  })

});

const setTitle= function(_title){
  const header       = document.querySelector('header');
  header.textContent = `Województwo ${_title}`;
}

const clearParentNode=function(){
  var node= document.querySelector(".pictures");
  while (node.firstChild) {
      node.removeChild(node.firstChild);
  }
}

const createBlock=function(_parent,_title, _url, _badge=0){

  let div     = document.createElement("div");
  div.classList.add('pic');
  let screen  = document.createElement("div");
  screen.classList.add('screen');
  let fTitle  = document.createElement("footer");
  fTitle.classList.add('fTitle');
  if( _badge != 0 ){
    let badge = document.createElement("div");
    badge.style.position        = "absolute";
    badge.style.top             = 0;
    badge.style.left            = 0;
    badge.style.padding         = '0 1rem';
    badge.style.backgroundColor = "#ec0b43";
    badge.style.color           = "#fff";
    badge.style.fontSize        = '12px';
    badge.style.clipPath        = 'polygon(0% 0%, 100% 0, 100% 35%, 75% 100%, 0% 100%)';
    badge.textContent           = _badge;
    div.append(badge);
  }

  if(_url.length>0) screen.style.backgroundImage=`url(./img/${_url})`;

  fTitle.textContent=_title;
  div.append(screen);
  div.append(fTitle);

  _parent.append(div);
}

const getMatrix = function(element) {
  const values = element.style.transform.split(/\w+\(|\);?/);
  console.log('values', values);
  const transform = values[1].split(/,\s?/g).map(numStr => parseInt(numStr));

  return {
    x: transform[0],
    y: transform[1],
    z: transform[2]
  };
}


const addBlocks=function(arg){
  setTitle(arg.name);
  for (const ite in arg) {

    if(ite  === 'products'){
      let products = arg[ite];
      const parent = document.querySelector('.pictures');
      clearParentNode();
      products.forEach((title)=>{
        let badge = title.badge;
        createBlock(parent, title.name, title.imgUrl, badge);

      })
    }
  }
}

class scrollCtrl{
  pos=0;
  scrollLeft=document.querySelector('.pictures').clientWidth;
}
const scrollerCtrl = new scrollCtrl;
function scrollToRight(){
  let newValue = scrollerCtrl.pos - scrollerCtrl.scrollLeft;
  document.querySelector('.pictures').style.transform=`translate3d(${parseInt(newValue)}px, 0px, 0px)`;
  scrollerCtrl.pos = newValue;
  if(newValue<0) arrowLeft.style.display='block';
}
function scrollToLeft(){
  let newValue = scrollerCtrl.pos + scrollerCtrl.scrollLeft;
  document.querySelector('.pictures').style.transform=`translate3d(${parseInt(newValue)}px, 0px, 0px)`;
  scrollerCtrl.pos = newValue;
  if(newValue==0) arrowLeft.style.display='none';
}