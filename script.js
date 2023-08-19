document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

//Mouse events
let isMousePressed = false;
document.addEventListener('mouseup', () => {
    isMousePressed = false;
});
document.addEventListener('mousedown', () => {
    isMousePressed = true;
});


//Grid events
const gridContainer = document.getElementById("gridContainer")
for(let i=0; i < 16 * 16; i++){
    const div = document.createElement('div');
    div.className = 'grid-item';


    div.addEventListener('mouseenter', ()=>{
        if(isMousePressed){
            div.style.backgroundColor = 'red';
        }
    })

    div.addEventListener('contentmenu', (event)=>{
        if(event.button===2){
            div.style.backgroundColor = 'lightgray';
        }
    })

    div.addEventListener('mouseleave', ()=>{
        if(!isMousePressed){
           div.style.backgroundColor = 'lightgray';
       }
    })  


    gridContainer.appendChild(div);
}