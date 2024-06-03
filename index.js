
// get random color function:
const colorList = ["blue", "yellow", "green", "red"];
let matchList = [];
let checkList = [];
let currentLevel = 0;
let gameStarted = false;

const getRandomColor = () => {
  const randomNum = Math.floor(Math.random() * colorList.length);
  return colorList[randomNum];
};


// color flash function:
const flashColor = (color) => {
  const element = document.querySelector("." + color);
  element.classList.add("opacity");
  setTimeout(() => {
    element.classList.remove("opacity");
  }, 50);
};


// update level function:
const updateLevel = (level) => {
  setTimeout( () => {
    document.querySelector(".title__text").innerHTML = `level ${level}`;  
  }, 200);
};  


// get colorMatch function:
const getColorMatch = (element) => {
  const backgroundColor = window.getComputedStyle(element).backgroundColor;
  switch (backgroundColor) {
    case "rgb(0, 128, 0)":
      return "green";
    case "rgb(0, 0, 255)":
      return "blue";
    case "rgb(255, 255, 0)":
      return "yellow";
    default: 
      return "red";
  }   
};


// color pressed function:
const colorPressed = (colorMatch) => {
  const element = document.querySelector(`.${colorMatch}`);
  element.classList.add("pressed");
  setTimeout(() => {
    element.classList.remove("pressed");
  },100);
};


// end game function: 
const endGame = () => {
  document.querySelector("h1").innerHTML = "🎉 High five! You nail it 🎉" 
  document.querySelectorAll(".main__block").forEach((block) => {
    block.removeEventListener("touchstart", handleClick);  
  })
};


// game Over function:
const gameOver = () => {
  document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
  document.querySelector("body").classList.add("errorBackground"); 
  resetGame();
};


// reset the game function:
const resetGame = () => {
  checkList = [];
  matchList = [];
  currentLevel = 0;
  gameStarted = false;  
};


// next level function:
const nextLevel = () => {
  const randomColor = getRandomColor();
  matchList.push(randomColor);
  
  setTimeout(() => {
    document.querySelector("h1").innerHTML = "Level " + matchList.length;
  }, 900)
  
  setTimeout(() => {
    flashColor(randomColor);
  }, 900)
  
  checkList = [];
};


const checkColorMatch = (colorMatch) => {
  checkList.push(colorMatch);
  if (checkList[checkList.length - 1] === matchList[checkList.length - 1]) {
    colorPressed(colorMatch);
    if (checkList.length == matchList.length) {              
      if (checkList.length === 10) {
        endGame();
      } else {  
        nextLevel();
      }  
    }          
  } else {
    gameOver();     
  }  
};

// add event Listener function:
const handleClick = (event) => {
  if (!gameStarted) {return};
  const colorMatch = getColorMatch(event.target);
  checkColorMatch(colorMatch);
};


// start game function:
const startGame = () => {
  if (currentLevel === 0) {
    document.querySelector("body").classList.remove("errorBackground"); 
    gameStarted = true;
    const randomColor = getRandomColor();
    matchList.push(randomColor); 
    flashColor(randomColor);
    updateLevel(1);
    currentLevel = 1;
  }
};
 

// key press event listener:
document.addEventListener("touchstart", startGame);
// document.addEventListener("click", startGame);


// click event listener:
document.querySelectorAll(".main__block").forEach((element) => {
  // element.addEventListener("click", handleClick);
  element.addEventListener("touchstart", handleClick);
})
