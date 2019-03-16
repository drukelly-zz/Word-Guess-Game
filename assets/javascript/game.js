// TODO
// - hp
// - start a new round
// - background sound
// - modal

// Arrays and Variables
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
let guesses = [];
let user = {
  "score" : 0
}
let cpu = {
  "score" : 0
}
// Selectors
const profilePhoto = document.getElementsByClassName("profile-photo")[0];
const gameboard = document.getElementsByClassName("gameboard")[0];
const playerHP = document.getElementsByClassName("player-hp")[0].firstElementChild;
const cpuHP = document.getElementsByClassName("cpu-hp")[0].firstElementChild;

// Functions
const displayModal = (message) => {
  console.log(message);
}
const inflictDamage = (whichPlayer, damage) => {
  document.getElementsByClassName(`${whichPlayer}`)[0].firstElementChild.style.width = `${damage}px`;
}
const isAlpha = (letter) => {
  if (letter.match(/^[A-Za-z]+$/) || letter === " " || letter === "." || letter === "-") {
    return true;
  }
}
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const nextRound = () => {

}
const playSound = (file, state) => {
  let audioPlayer = new Audio();
  audioPlayer.src = `assets/audio/${file}.ogg`;
  if (state === "pause") {
    audioPlayer.pause();
  }
  (state === "play") ? audioPlayer.play() : audioPlayer.stop()
}
const playNoSound = () => {
  // nothing going on here
}
const renderImage = (player) => {
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
      // 
      // runs out of guesses
      if (user["score"] === 10) {
        displayModal("you win");
      }
      if (cpu["score"] === 10) {
        displayModal("you lose");
      }
    } else {
      // losing logic
      guesses.push(guess);
      console.log("wrong!");
    }
    // for debugging purposes
    if (event.key === "Enter") {
      console.log(arr);
      (!selectedCharacter.sound) ? playNoSound() : playSound(selectedCharacter.sound, "play");
      renderImage(selectedCharacter.name);
    }
  }
});