/*
naming variables
extracting smaller functions
make sure that only one thing is exported to html
dont apply it directly on complex stuff
make a small project
autosave
*/

let lives = 3;

const getDimension = function(element, attribute) {
  return +element.style[attribute].replace("px", "");
};

const getElement = function(id) {
  return document.getElementById(id);
};

const startGame = function(fruit, fruitMargin) {
  let timer = 30;
  let interval = setInterval(function() {
    let liveDetails = document.getElementById("live");
    let bowlDetails = document.getElementById("bowl");
    let fruitDetails = document.getElementById(fruit);
    moveFruit(fruitDetails, fruitMargin);
    pickFruit(fruit, fruitDetails, interval, bowlDetails, liveDetails);
    initializeMissedFruit(fruit, fruitDetails, liveDetails, interval);
  }, timer);
};

const moveFruit = function(fruitDetails, fruitMargin) {
  let topIncrement = 10;
  let fruitTopValue = getDimension(fruitDetails, "top") + topIncrement + "px";
  fruitDetails.style.marginLeft = fruitMargin + "px";
  fruitDetails.style.top = fruitTopValue;
};

const pickFruit = function(
  fruit,
  fruitDetails,
  interval,
  bowlDetails,
  liveDetails
) {
  let fruitTop = getDimension(fruitDetails, "top");
  let fruitLeft = getDimension(fruitDetails, "marginLeft");
  let bowlLeft = getDimension(bowlDetails, "marginLeft");
  let bowlTop = 400;
  let bowlWidth = 300;
  let fruitInitialTop = -160;
  if (
    fruitTop > bowlTop &&
    fruitLeft > bowlLeft &&
    fruitLeft < bowlLeft + bowlWidth
  ) {
    fruitDetails.style.top = fruitInitialTop + "px";
    decrementOnPickingBug(fruit, interval, liveDetails);
    clearInterval(interval);
  }
};

const decrementOnPickingBug = function(fruit, interval, liveDetails) {
  let bugId = "4";
  if (fruit == bugId) {
    lives -= 1;
    liveDetails.innerText = lives;
    gameOverAction(interval, lives);
  }
};

const gameOverAction = function(interval, lives) {
  if (lives <= 0) {
    clearInterval(interval);
    let gameEnd = getElement("gameOver");
    gameEnd.style.display = "inline";
  }
};

const initializeMissedFruit = function(
  fruit,
  fruitDetails,
  liveDetails,
  interval
) {
  let pageTop = 750;
  let bugId = "4";
  let fruitInitialTop = -160;
  if (getDimension(fruitDetails, "top") > pageTop) {
    fruitDetails.style.top = fruitInitialTop + "px";
    lives -= 1;
    lives = incrementOnMissingBug(fruit, lives);
    liveDetails.innerText = lives;
    gameOverAction(interval, lives);
    clearInterval(interval);
  }
};

const incrementOnMissingBug = function(fruit, lives) {
  let bugId = "4";
  if (fruit == bugId) {
    lives += 1;
  }
  return lives;
};

const moveLeft = function(bowlStyle, bowlMarginLeft) {
  let pageExtremeLeft = -20;
  if (bowlMarginLeft >= pageExtremeLeft) {
    bowlStyle.marginLeft = bowlMarginLeft - 10 + "px";
  }
};

const moveRight = function(bowlStyle, bowlMarginLeft) {
  let pageExtremeRight = 1140;
  if (bowlMarginLeft <= pageExtremeRight) {
    bowlStyle.marginLeft = bowlMarginLeft + 10 + "px";
  }
};

const startMovement = function() {
  let timer = 3000;
  let fruitId = 1;
  numberOfFruits = 4;
  setInterval(function() {
    let bowlMargin = Math.floor(Math.random() * (1300 - 1) + 1);
    startGame(fruitId, bowlMargin);
    fruitId += 1;
    if (fruitId > numberOfFruits) {
      fruitId = 1;
    }
  }, timer);
};

const decideMovement = function(event) {
  let events = new Object();
  events["j"] = moveLeft;
  events["k"] = moveRight;
  events[" "] = startMovement;
  let bowlDetails = getElement("bowl");
  let bowlMarginLeft = getDimension(bowlDetails, "marginLeft");
  events[event.key](bowlDetails.style, bowlMarginLeft);
};

const reload = function() {
  document.location.reload();
};
