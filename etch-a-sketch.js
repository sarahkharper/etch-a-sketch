/*JAVASCRIPT FOR ETCH-A-SKETCH PROJECT*/

//Create references to elements in HTML (and to style sheet)
const body = document.querySelector("body");
const container = document.querySelector("#sketch-container");
const btn = document.querySelector("button");
/*NOTE: this didn't work due to chrome being weird about accessing stylesheets, figure out later
const stylesheet = document.styleSheets[0];
//locate hoverColor class in style sheet to modify later
const hoverColorRule = [...stylesheet.cssRules].find(
    (r) => r.selectorText === ".hoverColor",
);*/

//function to calculate total size of button and all of the blank space around it
function heightCalculation(itemReference){
    const itemStyle = getComputedStyle(itemReference);
    return itemReference.offsetHeight + parseInt(itemStyle.marginTop) + parseInt(itemStyle.marginBottom);
}

//function to add grid of row x col square divs
function makeGrid(rows = 16, cols = 16) { 

  //loop to create divs with class grid-item that will define div width x height
  for (let r = 0; r < rows; r++) { //create divs to hold rows
    const row = document.createElement("div");
    row.classList.add("grid-row");

    for (let c = 0; c < cols; c++){
        const btnHeight = heightCalculation(btn);
        let widthAndHeight = Math.min(window.innerWidth/cols, (window.innerHeight-btnHeight-2)/rows); //calculate size of boxes dynamically based on window width
        const gridItem = document.createElement("div");
        gridItem.classList.add('grid-item');
        gridItem.style.width = `${widthAndHeight}px`; //set box width
        gridItem.style.height = `${widthAndHeight}px`; //set box height
        //add event listener to change hover color when mouseover
        gridItem.addEventListener('mouseover', setRandomColor);
        //add event listener to add color when hover
        ['mouseover', 'mouseleave'].forEach((event) => {
            gridItem.addEventListener(event, () => {
                gridItem.classList.toggle('hoverColor');
            });
        });
        row.appendChild(gridItem);
    }
    container.appendChild(row);
  };
}

//make grid of desired row x col dims
makeGrid();

//add event listener to dynamically resize grid items
let gridItems = document.querySelectorAll('.grid-item');
addEventListener("resize", () => {
    const btnHeight = heightCalculation(btn);
    let widthAndHeight = Math.min(window.innerWidth, 
        window.innerHeight-btnHeight-2)/16; //calculate size of boxes dynamically based on window width
    gridItems.forEach((gridItem) =>{
        gridItem.style.width = `${widthAndHeight}px`; //set box width
        gridItem.style.height = `${widthAndHeight}px`; //set box height
    })
});

/*create array of colors to pick random color from
const colorArray = [
    '#ff0000', '#00ff00', '#0000ff', 
    '#ff3333', '#ffff00', '#ff6600'
];*/

//add event listener to set up color hover effect
/*['mouseover', 'mouseleave'].forEach((event) => {
    gridItems.forEach((gridItem) => {
        gridItem.addEventListener(event, () => {
            gridItem.classList.toggle('hoverColor');
        });
    });
});*/

//functions to generate random number and then use that to randomize RGB values
function randomNumber(min, max){
    return Math.random()* (max-min) + min;
}
function randomColor(){
    return `rgb(${randomNumber(0,255)} ${randomNumber(0,255)} ${randomNumber(0,255)})`;
}

//function to randomize hoverColor class background-color value
function setRandomColor(){
    const newColor = randomColor();
    hoverColorRule.style.setProperty("background-color", newColor);
}

//add event listener to button to change # of boxes in grid
btn.addEventListener('click', function(){
    container.replaceChildren(); //removes all children of container node
    let boxNum = prompt("How many boxes should each row have?");
    if (boxNum > 100 || boxNum < 1){
       alert("Number of boxes must be between 1 and 100");
    }
    makeGrid(boxNum, boxNum);
    let gridItems = document.querySelectorAll('.grid-item');
});

//function to prompt for # of boxes
    
/*    gridItem.addEventListener("mouseenter", ()=>{
        randomColor = pickColor();
        gridItem.style.backgroundColor = colorSelect;
    });
});*/