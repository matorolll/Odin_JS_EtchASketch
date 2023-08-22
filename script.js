
//options
const inputSliderSquareSize = document.getElementById('sliderSquareSize');
const outputsliderSquareSize = document.getElementById('sliderSquareSizeValue');
let squareSize = inputSliderSquareSize.value

const inputSliderBoardSize = document.getElementById('sliderBoardSize');
const outputsliderBoardSize = document.getElementById('sliderBoardSizeValue');
let boardSize = inputSliderBoardSize.value


inputSliderSquareSize.addEventListener('input', () => {
    squareSize = inputSliderSquareSize.value
    outputsliderSquareSize.textContent = `${squareSize}x${squareSize}`;
    createDrawingBoard(squareSize,boardSize)
});

inputSliderBoardSize.addEventListener('input', () => {
    boardSize = inputSliderBoardSize.value
    outputsliderBoardSize.textContent = `${boardSize}`;
    createDrawingBoard(squareSize,boardSize)
});


//Mouse events
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

let isLeftMousePressed = false;
let isCenterMousePressed = false;
let isRightMousePressed = false;

document.addEventListener('mouseup', () => {
    isLeftMousePressed = false;
    isCenterMousePressed = false;
    isRightMousePressed = false;
});

document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        isLeftMousePressed = true;
    } else if (event.button === 1){
        isCenterMousePressed = true;
    } else if (event.button === 2) {
        isRightMousePressed = true;
    }
});


//Grid events
createDrawingBoard = (squareSize,boardSize) =>{
    const gridContainer = document.getElementById("gridContainer")
    const trueSquareSize = boardSize/squareSize;
    gridContainer.innerHTML = ''; //clearing
    gridContainer.style.gridTemplateColumns = `repeat(${squareSize}, ${trueSquareSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${squareSize}, ${trueSquareSize}px)`;  

    for(let i=0; i < squareSize*squareSize; i++){
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.style.width = '${trueSquareSize}px';
        div.style.height = '${trueSquareSize}px';              
        gridContainer.appendChild(div);
    }
    addEventListenerToBoard()
}

addEventListenerToBoard = () => {
    const squares = document.querySelectorAll('.grid-item');
    
    squares.forEach(square => {
        square.addEventListener('mouseenter', () => {
            if (isLeftMousePressed) {
                square.style.backgroundColor = 'red';
            } else if (isRightMousePressed) {
                square.style.backgroundColor = 'blue';
            } else if (isCenterMousePressed) {
                square.style.backgroundColor = 'lightgray';
            }
        });
    });
};
    //div.addEventListener('contentmenu', (event)=>{
    //    if(event.button===2){
    //        div.style.backgroundColor = 'lightgray';
    //    }
    //})

    //div.addEventListener('mouseleave', ()=>{
    //    if(!isMousePressed){
    //       div.style.backgroundColor = 'lightgray';
    //  }
    //})  

createDrawingBoard(squareSize,boardSize)
