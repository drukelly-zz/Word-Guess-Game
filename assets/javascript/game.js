// TODO
// - research game mechanics
// - swap _ to guessed letter when guessed correctly
// - play sound when entire word is complete
// - start a new round

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
  }
];

// Selectors
const profilePhoto = document.getElementsByClassName("profile-photo")[0];
const gameboard = document.getElementsByClassName("gameboard")[0];

// Functions
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
const renderImage = (player) => {
  profilePhoto.innerHTML = `<img src="assets/images/${player.replace(" ", "-")}.gif" alt="" class="img-fluid">`;
}

// Events
// onload
document.addEventListener("DOMContentLoaded", () => {
  let selectedCharacter = sfCharacters[getRandomInt(sfCharacters.length)];
  let arr = [...selectedCharacter["name"]];
  console.log(arr);

  arr.forEach(char => {
    gameboard.innerHTML += `<span class="letter">–</span>`;
  });

  document.onkeypress = (event) => {
    if (event.key === "Enter") {
      playSound(selectedCharacter.sound);
      renderImage(selectedCharacter.name);
    }
  }
});