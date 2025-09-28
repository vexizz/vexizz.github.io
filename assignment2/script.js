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


// The Mute and Unmute Logic
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
  // Change play button to replay icon when video ends
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/replay.png";
});

// Fullscreen
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

// The Heart Button
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

heartButton.addEventListener("click", updateLikes);

const likesContainer = document.querySelector("#likes");
let likes = 0;

function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}

// Skipping to Certain Timepoint Button
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

// Comments
// Purpose: Adds new user-generated comments dynamically to the page. Contextual Rationale: Interactivity is central to media-sharing platforms. By enabling comments to be appended live, users feel a sense of immediacy and agency. This is consistent with the affordance of modern web apps: feedback must be quick, visible, and continuous.
// The comment feature balances functionality and style. Functionally, it allows users to interact. Stylistically, it integrates with the rest of the minimalist player design. The inclusion of usernames, even static ones like "User123", suggests future scalability (e.g., user login integration).
function addComment() {      
  const commentsContainer = document.getElementById('comments');
  const commentInput = document.getElementById('comment-input');
  const text = commentInput.value.trim();

  if (text === '') return; // Don't add empty comments. Design Influence: Instead of requiring a page reload, it immediately uploads the comments as soon as you hit "Post". This decision was informed by the importance of responsiveness in media culture, where users expect seamless updates and fast responses, especially nowadays in the digital culture. 

  // Create a new comment div // External Inspiration: Implementation is conceptually based on tutorials from YouTube as well as Pinterest, adapted with custom styling to fit the theme of the project. 
  const comment = document.createElement('div');
  comment.classList.add('comment');

  // Create a username element
  const username = document.createElement('div');
  username.classList.add('username');
  username.textContent = 'User123'; 

  // Creating the text element
  const commentText = document.createElement('div');
  commentText.classList.add('comment-text');
  commentText.textContent = text;

  // Append username and text to comment div. 
  comment.appendChild(username);
  comment.appendChild(commentText);

  // Add the comment to the container
  commentsContainer.appendChild(comment);

  // Clear the input
  commentInput.value = '';

  // Scroll to the bottom
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

// The Current Time Overlay at the Top of the Video
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
