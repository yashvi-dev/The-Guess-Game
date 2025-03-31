let randNum = Math.floor(Math.random() * 100) + 1;

console.log(randNum);

let btn = document.querySelector("button");
let userinp = document.getElementById("text");
let lowhi = document.querySelector(".lowhi");
let prevguess = document.querySelector(".pguess");
let remguess = document.querySelector(".lastresult");
let startover = document.querySelector(".result");

let para = document.createElement("p");
let prev = [];

// Tracking number of attempts
let numGuess = 1;
let playGame = true;

if (playGame) {
  btn.addEventListener("click", function () {
    let guess = parseInt(userinp.value);
    console.log(guess);
    validate(guess);
  });
}

function validate(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert("Please enter a valid number between 1 and 100.");
  } else {
    prev.push(guess);
    if (numGuess === 11) {
      displayguess(guess);
      displaymsg(`GAME OVER. Random number was ${randNum}`);
      endgame();
    } else {
      displayguess(guess);
      checkguess(guess);
    }
  }
}

function checkguess(guess) {
  const proximityRange = 5;

  if (guess === randNum) {
    displaymsg("You guessed it right!");
    endgame();
  } else if (Math.abs(guess - randNum) <= proximityRange) {
    displaymsg("You are close!");
  } else if (guess < randNum) {
    displaymsg("Number is TOO Low");
  } else {
    displaymsg("Number is TOO High");
  }
}

function displayguess(guess) {
  userinp.value = "";
  prevguess.innerHTML += `${guess}, `;
  numGuess++;
  remguess.innerHTML = `${11 - numGuess}`;
}

function displaymsg(message) {
  lowhi.innerHTML = `<h2>${message}</h2>`;
}

function endgame() {
  userinp.value = "";
  userinp.setAttribute("disabled", true);
  para.classList.add("button");
  para.innerHTML = '<h2 id="newGame">Start New Game</h2>';
  startover.appendChild(para);
  playGame = false;
  newGame();
}

function newGame() {
  let newbtn = document.querySelector("#newGame");
  newbtn.addEventListener("click", function () {
    randNum = Math.floor(Math.random() * 100) + 1;
    prev = [];
    numGuess = 1;
    prevguess.innerHTML = "";
    remguess.innerHTML = `${11 - numGuess}`;
    userinp.removeAttribute("disabled");
    startover.removeChild(para);
    lowhi.innerHTML = "";
    playGame = true;
  });
}
