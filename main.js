let defacultText = document.querySelector(".text");
let selecte = document.querySelectorAll(".select h3");
let spanLvl = document.querySelector(".lvl");
let spanSecond = document.querySelector(".second");
let button = document.querySelector(".start-game");
let input = document.querySelector(".input");
let wordPlay = document.querySelector(".word-play");
let theWord = document.querySelector(".the-word");
let timeSpan = document.querySelector(".time span");
let scoreSPan = document.querySelector(".score span");
let got = document.querySelector(".got");
let total = document.querySelector(".total");
let finish = document.querySelector(".finish");
////
let arryWords = [
  "hello",
  "programing",
  "code",
  "javascript",
  "town",
  "country",
  "testing",
  "youtube",
  "github",
  "twitter",
  "facebook",
  "linkedin",
  "instagram",
  "python",
  "myscript",
  "mysql",
  "sql",
  "whatsapp",
  "test",
  "wordpress",
  "playing",
];
////
let obj = {
  easy: 4,
  normal: 3,
  hard: 2,
};
let chosenDefacult;
let chosenSecond;
///
if (
  window.localStorage.getItem("defacult") &&
  window.localStorage.getItem("second")
) {
  chosenDefacult = window.localStorage.getItem("defacult");
  chosenSecond = window.localStorage.getItem("second");
  addToPage(chosenDefacult, chosenSecond);
  defacultText.innerHTML = window.localStorage.getItem("defacult");
  document
    .querySelector(`[data-defacult=${window.localStorage.getItem("defacult")}]`)
    .classList.add("active");
}

selecte.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    selecte.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    defacultText.innerHTML = e.target.innerHTML;
    chosenDefacult = e.target.dataset.defacult;
    chosenSecond = obj[e.target.dataset.defacult];
    addToPage(chosenDefacult, chosenSecond);
    window.localStorage.setItem("defacult", chosenDefacult);
    window.localStorage.setItem("second", chosenSecond);
  });
});

function addToPage(defacult, second) {
  spanLvl.innerHTML = defacult;
  spanSecond.innerHTML = second;
  timeSpan.innerHTML = second;
}

button.onclick = function () {
  button.remove();
  got.innerHTML = 0;
  total.innerHTML = arryWords.length;
  document.querySelector(".defacult").classList.add("no-toch");

  if (chosenSecond == null || chosenSecond == null) {
    defacultText.innerHTML = "normal";
    chosenDefacult = "normal";
    chosenSecond = obj[chosenDefacult];
    addToPage(chosenDefacult, chosenSecond);
  }
  input.focus();
  randomiz();
};

function randomiz() {
  let randomValue = arryWords[Math.floor(Math.random() * arryWords.length)];
  let index = arryWords.indexOf(randomValue);
  arryWords.splice(index, 1);
  theWord.innerHTML = randomValue;
  wordPlay.innerHTML = "";
  for (let i = 0; i < arryWords.length; i++) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(arryWords[i]));
    wordPlay.appendChild(div);
  }
  start();
}

function start() {
  timeSpan.innerHTML = chosenSecond;
  let startTime = setInterval(() => {
    timeSpan.innerHTML--;
    if (timeSpan.innerHTML == 0) {
      clearInterval(startTime);
      if (input.value == theWord.innerHTML) {
        input.value = "";
        got.innerHTML++;
        if (arryWords.length > 0) {
          randomiz();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          span.innerHTML = "good game";
          finish.appendChild(span);
          theWord.innerHTML = "";
          wordPlay.remove();
          input.blur();
          document.querySelector(".defacult").classList.remove("no-toch");
          finish.style.display = "flex";
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        span.innerHTML = "game over";
        finish.appendChild(span);
        finish.style.display = "flex";
      }
    }
  }, 1000);
}

input.onpaste = function () {
  return false;
};

document.querySelector(".btn").onclick = function () {
  window.location.reload();
};
document.onkeyup = function (e) {
  if (e.key == "Enter") {
    if (document.body.contains(button)) {
      button.click();
    } else if (finish.style.display == "flex") {
      window.location.reload();
    }
  }
};
