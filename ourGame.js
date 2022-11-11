//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const startContainer = document.getElementById("start-game-container");
const inGameContainer = document.getElementById("in-game-container");
const newGameButton = document.getElementById("new-game-button");
const backgroundImage = document.getElementById("background-image");
const correctCountText = document.getElementById("day-count-text");
const resultText = document.getElementById("result-text");
const winImage = document.getElementById("win-image");
const loseImage = document.getElementById("lose-image");

const pictureLinks = {
  door_0: "https://i.ibb.co/wBcffpM/door-0.png",
  door_1: "https://i.ibb.co/YkLnDCb/door-1.png",
  door_2: "https://i.ibb.co/2shFCfX/door-2.png",
  door_3: "https://i.ibb.co/MM3bFNm/door-3.png",
  door_4: "https://i.ibb.co/ZVDVSTs/door-4.png",
  win: "",
  lose: "https://i.ibb.co/Rcbg1yD/door-5.png",
};

//Options values for buttons
const allOptions = {
  blockmanGo: [
    "Shooting",
    "Bullets Fly",
    "Night at school",
    "Multiplayers",
    "Action",
    "Rodent Evil",
    "Open World",
    "Frontline",
    "Blockman Go",
    "Adventures",
    "Simulation",
    "Sky Block",
    "Build and Shoot",
    "Party Game",
  ],
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: [
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Dominica",
  ],
};

//count
let correctCount = 0;
let wrongCount = 0;

let chosenWord = "";

const startGame = () => {
  generateWord("blockmanGo");
  startContainer.classList.add("hide");
  inGameContainer.classList.remove("hide");
};
//Block all the Buttons
const blocker = () => {
  let letterButtons = document.querySelectorAll(".letters");
  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

const displayItem = (data) => {
  let displayData = "";
  for (i = 0; i < data.length; i++) {
    if (data[i] === " ") {
      displayData += '<span class="dashes">&emsp;</span>';
    } else {
      displayData += '<span class="dashes">' + data[i] + "</span>";
    }
  }
  return displayData;
};

//Word Generator
const generateWord = (optionValue) => {
  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = allOptions[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing
  let censorChosenWord = chosenWord.replace(/\S/g, "_");
  let displayWord = displayItem(censorChosenWord);
  // console.log(displayWord);

  //Display each element as span
  userInputSection.innerHTML = displayWord;
};

const backgroundChange = (value) => {
  let path = pictureLinks["door_" + String(value)];
  // console.log(path);
  backgroundImage.src = path;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  correctCount = 0;
  wrongCount = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            correctCount += 1;
            //if correctCount equals word lenfth
            if (correctCount == charArray.length) {
              winImage.classList.remove("hide");
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        wrongCount += 1;
        ansWrong(wrongCount);
        if (wrongCount == 7) {
          loseImage.classList.remove("hide");
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  //initialDrawing would draw the frame
  backgroundChange(0);
};

//draw the man
const ansWrong = (wrongCount) => {
  switch (wrongCount) {
    case 1:
      backgroundChange(1);
      break;
    case 2:
      backgroundChange(1);
      break;
    case 3:
      backgroundChange(2);
      break;
    case 4:
      backgroundChange(2);
      break;
    case 5:
      backgroundChange(3);
      break;
    case 6:
      backgroundChange(3);
      break;
    case 7:
      backgroundChange(4);
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
