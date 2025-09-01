// JavaScript for Music Player

// Array of songs
const songs = [
    {
        title: "Top Punjabi",
        artist: "Various Artists",
        src: "songs/topPunjabi.mp3",
        cover: "topPunjabi.jpeg",
    },
    {
        title: "Best Hindi/Bollywood",
        artist: "Various Artists",
        src: "songs/bestHindi.mp3",
        cover: "besthindi.jpeg",
    },
    {
        title: "MTV Hustle",
        artist: "Various Artists",
        src: "songs/hustle.mp3",
        cover: "hustle.jpeg",
    },
];

// Selecting elements
const albumCover = document.querySelector(".album");
const playButton = document.querySelector('img[src="assets/play.png"]');
const prevButton = document.querySelector('img[src="./assets/prev.png"]');
const nextButton = document.querySelector('img[src="./assets/next.png"]');
const shuffleButton = document.querySelector('img[src="./assets/shuffle.png"]');
const loopButton = document.querySelector('img[src="./assets/loop.png"]');
const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".curr-time");
const totTime = document.querySelector(".tot-time");

// Audio element
const audio = new Audio();
let currentSongIndex = 0;

// Initialize Player
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    albumCover.style.backgroundImage = `url(${song.cover})`;
    audio.addEventListener("loadedmetadata", () => {
        totTime.textContent = formatTime(audio.duration);
        progressBar.max = Math.floor(audio.duration);
    });
}

// Play or Pause Song
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.src = "assets/pause.png";
    } else {
        audio.pause();
        playButton.src = "assets/play.png";
    }
}

// Play Next Song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playButton.src = "assets/pause.png";
}

// Play Previous Song
function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playButton.src = "assets/pause.png";
}

// Shuffle Songs
function shuffleSongs() {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentSongIndex);
    audio.play();
    playButton.src = "assets/pause.png";
}

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currTime.textContent = formatTime(audio.currentTime);
});

// Seek Song
progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
});

// Format Time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Loop Song
loopButton.addEventListener("click", () => {
    audio.loop = !audio.loop;
    loopButton.style.opacity = audio.loop ? 1 : 0.7;
});

// Event Listeners
playButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", playNext);
prevButton.addEventListener("click", playPrev);
shuffleButton.addEventListener("click", shuffleSongs);

// Load the first song
loadSong(currentSongIndex);
