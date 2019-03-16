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
let hitSounds = ["hit1", "hit2", "hit3", "hit4", "hit5"];
let wrongGuesses = [];
// Selectors
const profilePhoto = document.getElementsByClassName("profile-photo")[0];
const gameboard = document.getElementsByClassName("gameboard")[0];
const playerHP = document.getElementsByClassName("player-hp")[0].firstElementChild;
const cpuHP = document.getElementsByClassName("cpu-hp")[0].firstElementChild;
const roundResult = document.getElementsByClassName("result")[0];

// Functions
const displayModal = (message) => {
  (message === "win")
    ? roundResult.innerHTML = `<img src="assets/images/you-win.png" alt="You Win">`
    : roundResult.innerHTML = `<img src="assets/images/you-lose.png" alt="You Lose">`
}
const isAlpha = (letter) => {
  if (letter.match(/^[A-Za-z]+$/) || letter === "." || letter === "-") {
    return true;
  }
}
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const nextRound = () => { // 😂
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
  // generate a character
  let selectedCharacter = sfCharacters[getRandomInt(sfCharacters.length)];
  // spread out the character name into an array
  let arr = [...selectedCharacter["name"]];
  // generate character tiles
  arr.forEach(char => {
    gameboard.innerHTML += `<span class="letter" data-letter="${char}">_</span>`;
  });
  // selector for each data-letter on gameboard
  const targetLetters = document.querySelectorAll("span[data-letter]");
  const perHitDamage = Math.round(100 / arr.length);
  // onkeypress
  document.onkeydown = (event) => {
    let guess = event.key;
    playSound(hitSounds[getRandomInt(hitSounds.length)], "play");
    if (isAlpha(guess) && selectedCharacter["name"].indexOf(guess) !== -1) {
      targetLetters.forEach(targetLetter => {
        targetLetterAttrs = targetLetter.attributes;
        // if the guess matches with the data-letter attribute value
        if (guess === targetLetterAttrs[1].value) {
          // print the text to the corresponding index/position
          targetLetter.textContent = guess;
          // add .letter-active css attribues
          targetLetter.classList.add("letter-active");
          // helps count the total of letters on gameboard
          let activeLetters = document.querySelectorAll(".letter-active");
          // the math for the hp bar
          // short character names = critical damage per hit
          // long character names = weaker damage
          cpuHP.style.width = `${[...activeLetters].length * perHitDamage}%`;
          // if the number matches, player has won!
          if (activeLetters.length === selectedCharacter["name"].length) {
            renderImage(selectedCharacter["name"]);
            (!selectedCharacter.sound) ? playNoSound() : playSound(selectedCharacter.sound, "play");
            displayModal("win");
            // not all characters will total to 100% so force it
            cpuHP.style.width = "100%";
            // delay starting the next round for 2500ms
            window.setTimeout(() => nextRound(), 2500);
          }
        }
      });
    } else {
      // all the incorrect guesses will get stored into an array
      // to determine count for the perHitDamange multiplier
      wrongGuesses.push(guess);
      playerHP.style.width = `${wrongGuesses.length * perHitDamage}%`;
      // x amount of guesses to win a round
      // x amount of incorrect guesses to lose a round
      if (wrongGuesses.length === selectedCharacter["name"].length) {
        playSound("lose", "play");
        displayModal("lose");
        playerHP.style.width = "100%";
        window.setTimeout(() => nextRound(), 1750);
      }
    }
  }
});