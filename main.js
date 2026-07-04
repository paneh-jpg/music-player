import { PLAYLISTS } from "./playlist.js";

console.log(PLAYLISTS);

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// DOM Elements
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const repeatBtn = $(".btn-repeat");
const randomBtn = $(".btn-random");
const playlistContainer = $(".playlist");
const currentTimeEl = $(".current-time");
const durationTimeEl = $(".duration-time");

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

$$(".sb-menu li").forEach((item) => item.classList.remove("active"));

// APP
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  songs: [...PLAYLISTS.playList4],

  // Load bài hát hiện tại
  loadCurrentSong() {
    const current = this.songs[this.currentIndex];
    heading.textContent = current.name;
    cdThumb.style.backgroundImage = `url('${current.image}')`;
    audio.src = current.path;

    currentTimeEl.textContent = "00:00";
    durationTimeEl.textContent = "00:00";

    cdThumb.classList.add("fade");
    setTimeout(() => cdThumb.classList.remove("fade"), 400);
  },

  // Render Playlist
  render() {
    const html = this.songs
      .map(
        (song, i) => `
      <div class="song ${
        i === this.currentIndex ? "active" : ""
      }" data-index="${i}">
        <div class="thumb" style="background-image: url('${song.image}')"></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option"><i class="fas fa-ellipsis-h"></i></div>
      </div>`,
      )
      .join("");
    playlistContainer.innerHTML = html;
  },

  nextSong() {
    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    this.loadCurrentSong();
    this.render();
  },

  prevSong() {
    this.currentIndex =
      (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    this.loadCurrentSong();
    this.render();
  },

  randomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
    this.render();
  },

  // EVENTS
  handleEvents() {
    const _this = this;

    // Scroll phóng to CD
    const cdWidth = cd.offsetWidth;
    document.onscroll = () => {
      const scrollTop = window.scrollY;
      const newWidth = cdWidth - scrollTop;
      cd.style.width = newWidth > 0 ? newWidth + "px" : 0;
      cd.style.opacity = newWidth / cdWidth;
    };

    // Play / Pause
    playBtn.onclick = () => {
      _this.isPlaying ? audio.pause() : audio.play();
    };

    audio.onplay = () => {
      _this.isPlaying = true;
      player.classList.add("playing");
    };

    audio.onpause = () => {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };

    // Tiến độ bài hát + hiển thị thời gian
    audio.ontimeupdate = () => {
      if (audio.duration) {
        progress.value = Math.floor((audio.currentTime / audio.duration) * 100);
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationTimeEl.textContent = formatTime(audio.duration);
      }
    };

    // Tua bài
    progress.onchange = (e) => {
      audio.currentTime = (audio.duration / 100) * e.target.value;
    };

    // Next - Prev
    nextBtn.onclick = () => {
      _this.nextSong();
      audio.play();
    };

    prevBtn.onclick = () => {
      _this.prevSong();
      audio.play();
    };

    // Random (loop mode)
    randomBtn.onclick = () => {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Repeat
    repeatBtn.onclick = () => {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Khi bài hát kết thúc
    audio.onended = () => {
      if (_this.isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else if (_this.isRandom) {
        _this.randomSong();
        audio.play();
      } else {
        _this.nextSong();
        audio.play();
      }
    };

    // Click chọn bài trong playlist
    playlistContainer.onclick = (e) => {
      const node = e.target.closest(".song:not(.active)");
      if (node) {
        _this.currentIndex = Number(node.dataset.index);
        _this.loadCurrentSong();
        _this.render();
        audio.play();
      }
    };

    // Sidebar
    $("#left-playlist").onclick = (e) => {
      const li = e.target.closest(".sb-item");
      if (!li) return;
      const key = li.dataset.playlist;
      $$("#left-playlist .sb-item").forEach((i) =>
        i.classList.remove("active"),
      );
      li.classList.add("active");
      _this.songs = [...PLAYLISTS[key]];
      _this.currentIndex = 0;
      _this.loadCurrentSong();
      _this.render();
      audio.play();
    };

    // Sidebar mobile toggle
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const sidebar = document.querySelector(".sidebar-left");
    const overlay = document.querySelector(".sidebar-overlay");

    menuBtn.onclick = () => {
      sidebar.classList.add("active");
      overlay.classList.add("active");
    };
    overlay.onclick = () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    };
  },

  start() {
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  },
};

app.start();
