let scr = 0;
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
      scr += 1;
      document.getElementById("score").innerText = scr;
      if (scr <= 0) {
        clearInterval(inter);
        alert("Game Over!!");
        document.location.reload();
      }
      if (i == 4) {
        scr -= 2;
        document.getElementById("score").innerText = scr;
        if (scr <= 0) {
          clearInterval(inter);
          alert("Game Over!!");
          document.location.reload();
        }
      }
      clearInterval(inter);
    }
    if (+document.getElementById(i).style.top.replace("px", "") > 750) {
      document.getElementById(i).style.top = -160 + "px";
      scr -= 1;
      if (i == 4) {
        scr += 1;
      }
      if (scr <= 0) {
        alert("Game Over!!");
      }
      document.getElementById("score").innerText = scr;
      clearInterval(inter);
    }
  }, 30);
};
