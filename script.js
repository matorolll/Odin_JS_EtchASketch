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

//color
const colorPickerPrimary = document.getElementById('colorPickerPrimary')
let firstColor = colorPickerPrimary.value
colorPickerPrimary.addEventListener('input', (event) => {
    firstColor = event.target.value;
})

const colorPickerSecondary = document.getElementById('colorPickerSecondary')
let secondColor = colorPickerSecondary.value
colorPickerSecondary.addEventListener('input', (event) => {
    secondColor = event.target.value;
})

const colorPickerThird = document.getElementById('colorPickerThird')
let thirdColor = colorPickerThird.value
colorPickerThird.addEventListener('input', (event) => {
    thirdColor = event.target.value;
})

const colorBoxes = document.querySelectorAll('.color-box');
colorBoxes.forEach(colorBox => {
    colorBox.addEventListener('mousedown', function(event) {
        selectedColor = getComputedStyle(colorBox).backgroundColor;
        const hexColor = rgbToHex(selectedColor);
        console.log('Selected color (hex):', hexColor);
        if (event.button === 0) {
            firstColor = hexColor;
            colorPickerPrimary.value = hexColor;      
        } else if (event.button === 1) {
            thirdColor = hexColor;
            colorPickerThird.value = hexColor;
        } else if (event.button === 2) {
            secondColor = hexColor;
            colorPickerSecondary.value = hexColor;
        }
    });
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
                square.style.backgroundColor = firstColor;
            } else if (isRightMousePressed) {
                square.style.backgroundColor = secondColor;
            } else if (isCenterMousePressed) {
                square.style.backgroundColor = thirdColor;
            }
        });

        square.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                square.style.backgroundColor = firstColor;
                //changeAdjacentColors(square)
            } else if (event.button === 2) {
                square.style.backgroundColor = secondColor;
            } else if (event.button === 1) {
                square.style.backgroundColor = thirdColor;
            }
        });

    });
};


function changeAdjacentColors(clickedDiv) {
    const allDivs = document.querySelectorAll('.grid-item');
    const clickedIndex = Array.from(allDivs).indexOf(clickedDiv);
    
    const adjacentIndices = [
        clickedIndex - 1,
        clickedIndex + 1,
        clickedIndex - squareSize,
        clickedIndex + squareSize
    ];
    
    adjacentIndices.forEach(index => {
        if (index >= 0 && index < allDivs.length) {
            allDivs[index].style.backgroundColor = secondColor;
        }
    });
    
    const lowerIndex = clickedIndex + squareSize;
    if (lowerIndex < allDivs.length) {
        allDivs[lowerIndex].style.backgroundColor = secondColor;
    }
}



//Help funtion
function rgbToHex(rgbColor) {
    const rgbValues = rgbColor.match(/\d+/g);
    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);
    const hexValue = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    return '#' + hexValue.toUpperCase();
}

createDrawingBoard(squareSize,boardSize)
