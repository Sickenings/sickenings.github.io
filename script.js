// script.js

// Configuración del reproductor de audio
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const progress = document.querySelector('.progress');

const songs = ['fill the void']; // Asegúrate de que estos nombres coincidan con los archivos .mp3
let songIndex = 0;

// Carga la canción y actualiza el título
function loadSong(index) {
    title.innerText = songs[index];
    audio.src = `${songs[index]}.mp3`;
}

// Reproduce la canción
function playSong() {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Cambia el ícono a pausa
}

// Pausa la canción
function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Cambia el ícono a play
}

// Actualiza la barra de progreso
function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Cambia a la siguiente canción
function nextSong() {
    songIndex = (songIndex + 1) % songs.length; // Cicla a la primera canción después de la última
    loadSong(songIndex);
    playSong();
}

// Cambia a la canción anterior
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Cicla a la última canción si está en la primera
    loadSong(songIndex);
    playSong();
}

// Eventos
audio.addEventListener('timeupdate', updateProgress); // Actualiza la barra de progreso mientras se reproduce
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Carga la primera canción al iniciar
loadSong(songIndex);
playSong(); // Reproduce la primera canción automáticamente
audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length; // Pasa a la siguiente canción
    loadSong(songIndex);
    playSong();
}); // Reproduce la segunda canción automáticamente después de que termine la primera