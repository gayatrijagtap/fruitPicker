let lives = 3;
const startGame = function(i, marVal) {
  inter = setInterval(function() {
    document.getElementById(i).style.marginLeft = marVal + "px";
    document.getElementById(i).style.top =
      +document.getElementById(i).style.top.replace("px", "") + 10 + "px";

    if (
      +document.getElementById(i).style.top.replace("px", "") > 400 &&
      +document.getElementById(i).style.marginLeft.replace("px", "") >
        +document.getElementById("bowl").style.marginLeft.replace("px", "") &&
      +document.getElementById(i).style.marginLeft.replace("px", "") <
        +document.getElementById("bowl").style.marginLeft.replace("px", "") +
          300
    ) {
      document.getElementById(i).style.top = -160 + "px";
      if (i == 4) {
        lives -= 1;
        document.getElementById("live").innerText = lives;
        if (lives <= 0) {
          clearInterval(inter);
          alert("Game Over!!");
          document.location.reload();
        }
      }
      clearInterval(inter);
    }
    if (+document.getElementById(i).style.top.replace("px", "") > 750) {
      document.getElementById(i).style.top = -160 + "px";
      lives -= 1;
      document.getElementById("live").innerText = lives;
      if (i == 4) {
        lives += 1;
        document.getElementById("live").innerText = lives;
      }
      if (lives <= 0) {
        alert("Game Over!!");
      }
      clearInterval(inter);
    }
  }, 30);
};
