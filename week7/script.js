// I need to access the play button

const playButton = document.querySelector("#play-button");
console.log(playButton);

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// I should also access the audio so that I can control it with my buttons.
const myAudio = document.querySelector("#my-audio");
console.log(myAudio);

// let us add a click event listener so that whenever someone clicks on the play button we can play the audio

playButton.addEventListener("click", playAudio);

pauseButton.addEventListener("click", pauseAudio);

function playAudio() {
    myAudio.play();
}

function pauseAudio() {
    myAudio.pause();
}

// my logic for creating q popping sound effect, first, I need to access the popping sound

const popSound = document.querySelector("#pop-sound");
console.log(popSound);

// I need to access the button and lsiten to clicks on it 
// so whenever someone clicks on that button, we hear a popping sound.


const popButton = document.querySelector("pop-button");
console.log(popButton);

popButton.addEventListener("click", popAudio);

function popAudio() {
    popSound.play();
}

const myVideo = document.querySelector("#my-video");
console.log(myVideo);

function playAudio() {
    myVideo.play();
}

function pauseAudio() {
    myVideo.pause();
}