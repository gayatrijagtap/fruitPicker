/*
naming variables
extracting smaller functions
make sure that only one thing is exported to html
dont apply it directly on complex stuff
make a small project
autosave
*/

let lives = 3;

const getElement = function(id) {
  return document.getElementById(id);
};

const startGame = function(fruit, fruitMargin) {
  let interval = setInterval(function() {
    let liveDetails = document.getElementById("live");
    let bowlDetails = document.getElementById("bowl");
    let fruitDetails = document.getElementById(fruit);

    moveFruit(fruitDetails, fruitMargin);
    pickFruit(fruit, fruitDetails, interval, bowlDetails, liveDetails);
    gameOver(fruit, fruitDetails, liveDetails, interval);
  }, 30);
};

const moveFruit = function(fruitDetails, fruitMargin) {
  fruitDetails.style.marginLeft = fruitMargin + "px";
  fruitDetails.style.top =
    +fruitDetails.style.top.replace("px", "") + 10 + "px";
};

const pickFruit = function(
  fruit,
  fruitDetails,
  interval,
  bowlDetails,
  liveDetails
) {
  let fruitTop = +fruitDetails.style.top.replace("px", "");
  let fruitLeft = +fruitDetails.style.marginLeft.replace("px", "");
  let bowlLeft = +bowlDetails.style.marginLeft.replace("px", "");

  if (fruitTop > 400 && fruitLeft > bowlLeft && fruitLeft < bowlLeft + 300) {
    fruitDetails.style.top = -160 + "px";
    triggerBug(fruit, interval, liveDetails);
    clearInterval(interval);
  }
};

const triggerBug = function(fruit, interval, liveDetails) {
  if (fruit == 4) {
    lives -= 1;
    liveDetails.innerText = lives;
    if (lives <= 0) {
      clearInterval(interval);
      alert("Game Over!!");
      document.location.reload();
    }
  }
};

const gameOver = function(fruit, fruitDetails, liveDetails, interval) {
  if (+fruitDetails.style.top.replace("px", "") > 750) {
    fruitDetails.style.top = -160 + "px";
    lives -= 1;
    liveDetails.innerText = lives;
    if (fruit == 4) {
      lives += 1;
      liveDetails.innerText = lives;
    }
    if (lives <= 0) {
      alert("Game Over!!");
    }
    clearInterval(interval);
  }
};

const moveLeft = function(bowlStyle, bowlMarginLeft) {
  if (bowlMarginLeft >= -20) {
    bowlStyle.marginLeft = bowlMarginLeft - 10 + "px";
  }
};

const moveRight = function(bowlStyle, bowlMarginLeft) {
  if (bowlMarginLeft <= 1140) {
    bowlStyle.marginLeft = bowlMarginLeft + 10 + "px";
  }
};

const startMovement = function() {
  fruit = 1;
  setInterval(function() {
    bowlMargin = Math.floor(Math.random() * (1300 - 1) + 1);
    startGame(fruit, bowlMargin);
    fruit += 1;
    if (fruit > 4) {
      fruit = 1;
    }
  }, 3000);
};

const decideMovement = function(event) {
  let events = new Object();
  events["j"] = moveLeft;
  events["k"] = moveRight;
  events[" "] = startMovement;
  let bowlStyle = getElement("bowl").style;
  let bowlMarginLeft = +bowlStyle.marginLeft.replace("px", "");
  events[event.key](bowlStyle, bowlMarginLeft);
};
