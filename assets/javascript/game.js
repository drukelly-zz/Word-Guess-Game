// TODO
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
    "name"  : "e.honda",
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
    "name"  : "m.bison",
    "sound" : ""
  },
  {
    "name"  : "akuma",
    "sound" : ""
  }
];
let wrongGuesses = [];
// Selectors
const profilePhoto = document.getElementsByClassName("profile-photo")[0];
const gameboard = document.getElementsByClassName("gameboard")[0];
const playerHP = document.getElementsByClassName("player-hp")[0].firstElementChild;
const cpuHP = document.getElementsByClassName("cpu-hp")[0].firstElementChild;

// Functions
const displayModal = (message) => {
  console.log(message);
}
const isAlpha = (letter) => {
  if (letter.match(/^[A-Za-z]+$/) || letter === "." || letter === "-") {
    return true;
  }
}
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const nextRound = () => {
  window.location.reload(false);
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
    gameboard.innerHTML += `<span class="letter" data-letter="${char}">_</span>`;
  });
  const targetLetters = document.querySelectorAll("span[data-letter]");
  const perHitDamage = Math.round(100 / arr.length);
  console.log(`per hit => ${perHitDamage}%`);
  // onkeypress
  document.onkeydown = (event) => {
    let guess = event.key;
    if (isAlpha(guess) && selectedCharacter["name"].indexOf(guess) !== -1) {
      targetLetters.forEach(targetLetter => {
        targetLetterAttrs = targetLetter.attributes;
        if (guess === targetLetterAttrs[1].value) {
          targetLetter.textContent = guess;
          targetLetter.classList.add("letter-active");
          let activeLetters = document.querySelectorAll(".letter-active");
          cpuHP.style.width = `${[...activeLetters].length * perHitDamage}%`;
          if (activeLetters.length === selectedCharacter["name"].length) {
            renderImage(selectedCharacter["name"]);
            (!selectedCharacter.sound) ? playNoSound() : playSound(selectedCharacter.sound, "play");
            displayModal("you win!");
            cpuHP.style.width = "100%";
            window.setTimeout(() => nextRound(), 2000);
          }
        }
      });
    } else {
      // losing logic
      wrongGuesses.push(guess);
      playerHP.style.width = `${wrongGuesses.length * perHitDamage}%`;
      if (wrongGuesses.length === selectedCharacter["name"].length) {
        playSound("lose", "play");
        displayModal("YOU LOSE");
        playerHP.style.width = "100%";
        window.setTimeout(() => nextRound(), 2000);
      }
    }
  }
});