//Setting color for nav
const colorfulText = document.getElementById('colorfulText');
const text = colorfulText.textContent;
colorfulText.innerHTML = '';

for (const char of text) {
  const span = document.createElement('span');
  if (char === ' ') {
    span.textContent = '\u00A0';
  } else {
    span.textContent = char;
    span.style.color = generateRandomColor();
  }
  colorfulText.appendChild(span);
}


////Options////
//Number of squares
const inputSliderSquareSize = document.getElementById('sliderSquareSize');
const outputsliderSquareSize = document.getElementById('sliderSquareSizeValue');
let squareSize = inputSliderSquareSize.value

inputSliderSquareSize.addEventListener('input', () => {
    squareSize = inputSliderSquareSize.value
    outputsliderSquareSize.textContent = `${squareSize}x${squareSize}`;
    createDrawingBoard(squareSize,boardSize)
});


//Size of drawing board
const inputSliderBoardSize = document.getElementById('sliderBoardSize');
const outputsliderBoardSize = document.getElementById('sliderBoardSizeValue');
let boardSize = inputSliderBoardSize.value

inputSliderBoardSize.addEventListener('input', () => {
    boardSize = inputSliderBoardSize.value
    outputsliderBoardSize.textContent = `${boardSize}`;
    createDrawingBoard(squareSize,boardSize)
});


//Color picker for mouse buttons
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


//Generating colorboxes
const colorboxesContainer = document.getElementById("colorboxes");
for (let i = 0; i < 24; i++) {
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = generateRandomColor();
    colorboxesContainer.appendChild(colorBox);
}


//Quick color picker
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


//Size of brush
const inputBrushSize = document.getElementById('sliderBrushSize');
const outputBrushSize = document.getElementById('sliderBrushSizeValue');
let brushSize = inputBrushSize.value

inputBrushSize.addEventListener('input', () => {
    brushSize = inputBrushSize.value
    outputBrushSize.textContent = `${brushSize}`;
});


//Brush type
const radioBrushType = document.getElementsByName('radioBrushType');
let brushType = 'star';
radioBrushType.forEach(radio => {
    radio.addEventListener('change', (event) => {
        brushType = event.target.value;
  });
});




//Lightener
const checkboxLightener = document.getElementById("checkboxLightener");
const inputSliderLightener = document.getElementById('sliderLightener');
const outputSliderLightener = document.getElementById('sliderLightenerValue');
let lightenerValue = inputSliderLightener.value
let lightOption = false;
checkboxLightener.addEventListener("change", function() {
    if (checkboxLightener.checked) {
        lightOption = true;
        inputSliderLightener.style.display = ' inline-block';
        outputSliderLightener.style.display = ' inline-block';
    } else {   
        lightOption = false;
        inputSliderLightener.style.display = 'none';
        outputSliderLightener.style.display = 'none';
    }
});
inputSliderLightener.addEventListener('input', () => {
    lightenerValue = inputSliderLightener.value
    outputSliderLightener.textContent = `${lightenerValue}%`;
});


//Darkener
const checkboxDarkener = document.getElementById("checkboxDarkener");
const inputSliderDarkener = document.getElementById('sliderDarkener');
const outputSliderDarkener = document.getElementById('sliderDarkenerValue');
let darkenerValue = inputSliderDarkener.value
let darkOption = false;
checkboxDarkener.addEventListener("change", function() {
    if (checkboxDarkener.checked) {
        darkOption = true;
        inputSliderDarkener.style.display = ' inline-block';
        outputSliderDarkener.style.display = ' inline-block';
    } else {   
        darkOption = false;
        inputSliderDarkener.style.display = 'none';
        outputSliderDarkener.style.display = 'none';
    }
});
inputSliderDarkener.addEventListener('input', () => {
    darkenerValue = inputSliderDarkener.value
    outputSliderDarkener.textContent = `${darkenerValue}%`;
});





//Random color checkbox
const checkboxRandomColor = document.getElementById("checkboxRandomColor");
let randomColor = false;
checkboxRandomColor.addEventListener("change", function() {
    if (checkboxRandomColor.checked) {
        randomColor = true;
    } else {   
        randomColor = false;
    }
});


//Fill entire board
const colorPickerBoard = document.getElementById("colorPickerBoard");
let colorBoard = colorPickerBoard.value
colorPickerBoard.addEventListener('input', (event) => {
    colorBoard = event.target.value;
    const squares = document.querySelectorAll('.grid-item');
    squares.forEach(square => {
        square.style.backgroundColor = colorBoard;
    });
})


//Fill board grid
const colorGridPickerBoard = document.getElementById("colorGridPickerBoard");
let colorGridBoard = colorGridPickerBoard.value
colorGridPickerBoard.addEventListener('input', (event) => {
    colorGridBoard = event.target.value;
    const squares = document.querySelectorAll('.grid-item');
    squares.forEach(square => {
        square.style.border = `1px solid ${colorGridBoard}`;
    });
})


//Showing grid pattern
const checkboxShowGrid = document.getElementById("checkboxShowGrid");
checkboxShowGrid.addEventListener("change", function() {
    const squares = document.querySelectorAll('.grid-item');
    if (checkboxShowGrid.checked) {
        console.log("is pciked")
        squares.forEach(square => {
            square.style.border = `1px solid ${colorGridBoard}`;
        });
    } else {   
        console.log("is not pciked")
        squares.forEach(square => {
            square.style.border = `0px`;
        });
    }
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


document.addEventListener('wheel', (event) => {
    const delta = Math.sign(event.deltaY);
    if (delta > 0) {
        brushSize = parseInt(brushSize) + 1;
    } else if (delta < 0) {
        brushSize = parseInt(brushSize) - 1;
    }
    brushSize = Math.min(Math.max(brushSize, 1), 6);
    inputBrushSize.value = brushSize;
    outputBrushSize.textContent = `${brushSize}`;
})



////Grid////
//Drawing X divs
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


//Adding events to board
addEventListenerToBoard = () => {
    const squares = document.querySelectorAll('.grid-item');
    
    squares.forEach(square => {
        square.addEventListener('mouseenter', () => {
            if (isLeftMousePressed) {
                changeColor(square, firstColor)
            } else if (isRightMousePressed) {
                changeColor(square, secondColor)
            } else if (isCenterMousePressed) {
                changeColor(square, thirdColor)
            }
        });

        square.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                changeColor(square, firstColor)
            } else if (event.button === 2) {
                changeColor(square, secondColor)
            } else if (event.button === 1) {
                changeColor(square, thirdColor)
            }
        });
    });
};


//Changing color, type and size of brush
function changeColor(clickedDiv, color) {
    const allDivs = document.querySelectorAll('.grid-item');
    const clickedIndex = Array.from(allDivs).indexOf(clickedDiv);
    const clickedDivColor = window.getComputedStyle(clickedDiv, null).getPropertyValue("background-color");


    //if(randomColor){
    //    color = generateRandomColor();
    //}    
    //if(darkOption){
    //   color = darkenColor(clickedDivColor, darkenerValue)
    //}
    //if(lightOption){
    //    color = lightenColor(clickedDivColor, lightenerValue)
    //}

    function colorAdjacentDivs(index, depth) {
        let adjacentIndices = []
        if (depth <= 0){
            if(randomColor){
                color = generateRandomColor();
                allDivs[index].style.backgroundColor = color;
            } 
            if(lightOption){
                colorOfSingleDiv = window.getComputedStyle(allDivs[index], null).getPropertyValue("background-color");
                color = lightenColor(colorOfSingleDiv, lightenerValue)
                allDivs[index].style.backgroundColor = color;
            }

            if(darkOption){
                colorOfSingleDiv = window.getComputedStyle(allDivs[index], null).getPropertyValue("background-color");
                color = darkenColor(colorOfSingleDiv, darkenerValue)
                allDivs[index].style.backgroundColor = color;
            }

            allDivs[index].style.backgroundColor = color;
            return;
        } 
        if(brushType == 'star'){
            adjacentIndices.push(
                index,
                index - squareSize,
                index + squareSize * 1,
                index - 1,
                index + 1
            );
        }
        else if(brushType == 'square'){
            adjacentIndices.push(
                index,
                index - squareSize,
                index + squareSize * 1,
                index - 1,
                index + 1,

                index - squareSize - 1,
                index + squareSize * 1 - 1,
                index - squareSize + 1,
                index + squareSize * 1 + 1
            );
        }

        adjacentIndices.forEach(adjIndex => {
            if (adjIndex >= 0 && adjIndex < allDivs.length) {
                colorAdjacentDivs(adjIndex, depth - 1);
            }
        });
    }
    colorAdjacentDivs(clickedIndex, brushSize -1);
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

//function hexToRgb(hex) {
 //   const bigint = parseInt(hex.slice(1), 16);
 //   const r = (bigint >> 16) & 255;
//    const g = (bigint >> 8) & 255;
 //   const b = bigint & 255;
//    return [r, g, b];
//}


function lightenColor(color, percent) {
    var rgbArray = color.replace(/[^\d,]/g, '').split(',');
        var newRgbArray = rgbArray.map(function(value) {
        return Math.floor(value * (1 + percent / 100));
    });
    return 'rgb(' + newRgbArray.join(',') + ')';
}

function darkenColor(color, percent) {
    var rgbArray = color.replace(/[^\d,]/g, '').split(',');
        var newRgbArray = rgbArray.map(function(value) {
        return Math.floor(value * (1 - percent / 100));
    });
    return 'rgb(' + newRgbArray.join(',') + ')';
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

createDrawingBoard(squareSize,boardSize)






