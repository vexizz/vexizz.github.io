const video = document.querySelector("#custom-video-player");

const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");

const progressBar = document.querySelector("#progress-bar-fill");
console.log(progressBar);

video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here

const MuteUnmuteBtn = document.querySelector("#mute-unmute-btn");
console.log(MuteUnmuteBtn);

video.addEventListener("click", toggleAudio);

const MuteUnmuteImg = document.querySelector("#mute-unmute-img");

function toggleAudio() {
  if (video.muted) {
    video.muted = false; // Unmute
    MuteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  } else {
    video.muted = true; // Mute
    MuteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  }
}

// Speed up Button

const FastForwardBtn = document.querySelector("#fast-forward-btn");
console.log(FastForwardBtn);

video.addEventListener("click", SpeedUp);

const FastForwardImg = document.querySelector("#fast-forward-img");

const progressContainer = document.querySelector(".progress-bar");

function SpeedUp() {
  if (video.playbackRate === 1.0) {
    video.playbackRate = 2.0;
  } else {
    video.playbackRate = 1.0;
  }
}

// Drag to skip
let isDragging = false;

progressContainer.addEventListener("mousedown", () => {
    isDragging = true;
});

window.addEventListener("mouseup", () =>
    { isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const rect = progressContainer.getBoundingClientRect();
  let posX = e.clientX - rect.left;
  posX = Math.max(0, Math.min(posX, rect.width));
  video.currentTime = (posX / rect.width) * video.duration;
});

video.addEventListener("ended", () => {
  // change play button to replay icon
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/replay.png";
});

const FullscreenButton = document.querySelector("#fullscreen-button");
console.log(FullscreenButton);

FullscreenButton.addEventListener("click", toggleFullscreen);

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

heartButton.addEventListener("click", updateLikes);

const likesContainer = document.querySelector("#likes");
let likes = 0;

function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}

const step1Button = document.querySelector("#step1-button");
console.log(step1Button);

step1Button.addEventListener("click", gotoStep1);

function gotoStep1() {
  video.currentTime = 16.0;
}

const step2Button = document.querySelector("#step2-button");
console.log(step2Button);

step2Button.addEventListener("click", gotoStep2);

function gotoStep2() {
  video.currentTime = 43.0;
}

function addComment() {
  const commentsContainer = document.getElementById('comments');
  const commentInput = document.getElementById('comment-input');
  const text = commentInput.value.trim();

  if (text === '') return; // don't add empty comments

  // Create a new comment div
  const comment = document.createElement('div');
  comment.classList.add('comment');

  // Create a username element
  const username = document.createElement('div');
  username.classList.add('username');
  username.textContent = 'User123'; // You can make this dynamic later

  // Create the text element
  const commentText = document.createElement('div');
  commentText.classList.add('comment-text');
  commentText.textContent = text;

  // Append username and text to comment div
  comment.appendChild(username);
  comment.appendChild(commentText);

  // Add the comment to the container
  commentsContainer.appendChild(comment);

  // Clear the input
  commentInput.value = '';

  // Scroll to the bottom
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// When video metadata loads, show total time
video.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(video.duration);
});

// Update current time as video plays
video.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(video.currentTime);
});
