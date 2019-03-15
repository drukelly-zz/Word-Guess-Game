// TODO
// - score counter
// - start a new round

// Arrays
let sfCharacters = [
  {
    "name"  : "ryu",
    "sound" : "hadouken"
  },
  {
    "name"  : "ken",
    "sound" : "shoryuken"
  },
  {
    "name"  : "e. honda",
    "sound" : "flying-headbutt"
  },
  {
    "name"  : "guile",
    "sound" : "sonic-boom"
  },
  {
    "name"  : "chun-li",
    "sound" : "spinning-bird-kick"
  },
  {
    "name"  : "blanka",
    "sound" : "beast-roll"
  },
  {
    "name"  : "zangief",
    "sound" : "laughing"
  },
  {
    "name"  : "dhalsim",
    "sound" : "yoga-fire"
  },
  {
    "name"  : "balrog",
    "sound" : ""
  },
  {
    "name"  : "vega",
    "sound" : "wall-dive"
  },
  {
    "name"  : "sagat",
    "sound" : "tiger-uppercut"
  },
  {
    "name"  : "m. bison",
    "sound" : ""
  },
  {
    "name"  : "akuma",
    "sound" : ""
  }
];
const guesses = [];

// Selectors
const profilePhoto = document.getElementsByClassName("profile-photo")[0];
const gameboard = document.getElementsByClassName("gameboard")[0];

// Functions
const isAlpha = (letter) => {
  if (letter.match(/^[A-Za-z]+$/) || letter === " " || letter === "." || letter === "-") {
    return true;
  }
}
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const playSound = (file) => {
  let audioPlayer = new Audio();
  audioPlayer.src = `assets/audio/${file}.ogg`;
  audioPlayer.play();
  // does this really work?
  // audioPlayer.onended = () => {
  //   audioPlayer.pause();
  //   audioPlayer.currentTime = 0;
  // }
}
const playNoSound = () => { }

const renderImages = (player) => {
  profilePhoto.innerHTML = `<img src="assets/images/${player.replace(" ", "-")}.gif" alt="">`;
}

// Events
// onload
document.addEventListener("DOMContentLoaded", () => {
  let selectedCharacter = sfCharacters[getRandomInt(sfCharacters.length)];
  let arr = [...selectedCharacter["name"]];
  arr.forEach(char => {
    gameboard.innerHTML += `<span class="letter letter-inactive" data-letter="${char}">_</span>`;
  });
  let targetLetters = document.querySelectorAll("span[data-letter]");
  targetLetters.forEach(targetLetter => {
    console.log(targetLetter.attributes[1].value);
  });
  // check
  // console.log(arr, targetLetters);
  
  // onkeypress
  document.onkeydown = (event) => {
    let guess = event.key;
    if (isAlpha(guess) && arr.indexOf(guess[0]) !== -1) {
      targetLetters.forEach(targetLetter => {
        targetLetterAttrs = targetLetter.attributes;
        if (guess === targetLetterAttrs[1].value) {
          targetLetter.textContent = guess;
          targetLetter.classList.remove("letter-inactive");
        }
      });
    }
    // for debugging purposes
    if (event.key === "Enter") {
      console.log(arr);
      (!selectedCharacter.sound) ? playNoSound() : playSound(selectedCharacter.sound);
      renderImages(selectedCharacter.name);
    }
  }
});