// ==========================
// Helpers
// ==========================
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

// ==========================
// PLAYLIST DATA
// ==========================
const PLAYLISTS = {
  phuongAnh: [
    {
      name: "Harleys In Hawaii",
      singer: "Katy Perry",
      path: "./assets/music/playlist-1/song1.mp3",
      image: "./assets/img/playlist-1/song1.jpg",
    },
    {
      name: "Kiss Me More (feat. SZA)",
      singer: "Doja Cat, SZA",
      path: "./assets/music/playlist-1/song2.mp3",
      image: "./assets/img/playlist-1/song2.jpg",
    },
    {
      name: "YAD",
      singer: "Vanna Rainelle",
      path: "./assets/music/playlist-1/song3.mp3",
      image: "./assets/img/playlist-1/song3.jpg",
    },
    {
      name: "Young And Beautiful",
      singer: "Lana Del Rey",
      path: "./assets/music/playlist-1/song4.mp3",
      image: "./assets/img/playlist-1/song4.jpg",
    },
    {
      name: "Play Date",
      singer: "Melanie Martinez",
      path: "./assets/music/playlist-1/song5.mp3",
      image: "./assets/img/playlist-1/song5.jpg",
    },
    {
      name: "Mind Games",
      singer: "Sickick",
      path: "./assets/music/playlist-1/song6.mp3",
      image: "./assets/img/playlist-1/song6.jpg",
    },
    {
      name: "Somewhere Only We Know",
      singer: "Gustixa, rhianne",
      path: "./assets/music/playlist-1/song7.mp3",
      image: "./assets/img/playlist-1/song7.jpg",
    },
    {
      name: "Shinunoga E-Wa",
      singer: "Fujii Kaze",
      path: "./assets/music/playlist-1/song8.mp3",
      image: "./assets/img/playlist-1/song8.jpg",
    },
    {
      name: "Heat Waves",
      singer: "Glass Animals",
      path: "./assets/music/playlist-1/song9.mp3",
      image: "./assets/img/playlist-1/song9.jpg",
    },
    {
      name: "Love Story",
      singer: "Indila",
      path: "./assets/music/playlist-1/song10.mp3",
      image: "./assets/img/playlist-1/song10.jpg",
    },
    {
      name: "Cinnamon Girl",
      singer: "Lana Del Rey",
      path: "./assets/music/playlist-1/song11.mp3",
      image: "./assets/img/playlist-1/song11.jpg",
    },
    {
      name: "Blank Space",
      singer: "Taylor Swift",
      path: "./assets/music/playlist-1/song12.mp3",
      image: "./assets/img/playlist-1/song12.jpg",
    },
    {
      name: "Apocalypse",
      singer: "Cigarettes After Sex",
      path: "./assets/music/playlist-1/song13.mp3",
      image: "./assets/img/playlist-1/song13.jpg",
    },
    {
      name: "Kill Bill",
      singer: "SZA",
      path: "./assets/music/playlist-1/song14.mp3",
      image: "./assets/img/playlist-1/song14.jpg",
    },
    {
      name: "Those Eyes",
      singer: "New West",
      path: "./assets/music/playlist-1/song15.mp3",
      image: "./assets/img/playlist-1/song15.jpg",
    },
    {
      name: "End of Beginning",
      singer: "Djo",
      path: "./assets/music/playlist-1/song16.mp3",
      image: "./assets/img/playlist-1/song16.jpg",
    },
    {
      name: "Afterthought",
      singer: "Joji, BENEE",
      path: "./assets/music/playlist-1/song17.mp3",
      image: "./assets/img/playlist-1/song17.jpg",
    },
    {
      name: "Heather",
      singer: "Conan Gray",
      path: "./assets/music/playlist-1/song18.mp3",
      image: "./assets/img/playlist-1/song18.jpg",
    },
  ],
  biTiNguyen: [
    {
      name: "Marvin Gaye",
      singer: "Charlie Puth, Meghan Trainor",
      path: "./assets/music/playlist-2/1.mp3",
      image: "./assets/img/playlist-2/1.jpg",
    },
    {
      name: "Radioactive",
      singer: "Imagine Dragons",
      path: "./assets/music/playlist-2/2.mp3",
      image: "./assets/img/playlist-2/2.jpg",
    },
    {
      name: "Thunder",
      singer: "Imagine Dragons",
      path: "./assets/music/playlist-2/3.mp3",
      image: "./assets/img/playlist-2/3.jpg",
    },
    {
      name: "Bad Liar",
      singer: "Imagine Dragons",
      path: "./assets/music/playlist-2/4.mp3",
      image: "./assets/img/playlist-2/4.jpg",
    },
    {
      name: "Believer",
      singer: "Imagine Dragons",
      path: "./assets/music/playlist-2/5.mp3",
      image: "./assets/img/playlist-2/5.jpg",
    },
    {
      name: "Demons",
      singer: "Imagine Dragons",
      path: "./assets/music/playlist-2/6.mp3",
      image: "./assets/img/playlist-2/6.jpg",
    },
    {
      name: "Natural",
      singer: "Imagine Dragons",
      path: "./assets/music/playlist-2/7.mp3",
      image: "./assets/img/playlist-2/7.jpg",
    },
    {
      name: "Take Me To Church",
      singer: "Hozier",
      path: "./assets/music/playlist-2/8.mp3",
      image: "./assets/img/playlist-2/8.jpg",
    },
    {
      name: "Too Sweet",
      singer: "Hozier",
      path: "./assets/music/playlist-2/9.mp3",
      image: "./assets/img/playlist-2/9.jpg",
    },
    {
      name: "One More Night",
      singer: "Maroon 5",
      path: "./assets/music/playlist-2/10.mp3",
      image: "./assets/img/playlist-2/10.jpg",
    },
    {
      name: "One Thing",
      singer: "One Direction",
      path: "./assets/music/playlist-2/11.mp3",
      image: "./assets/img/playlist-2/11.jpg",
    },
    {
      name: "What Makes You Beautiful",
      singer: "One Direction",
      path: "./assets/music/playlist-2/12.mp3",
      image: "./assets/img/playlist-2/12.jpg",
    },
    {
      name: "Payphone",
      singer: "Maroon 5, Wiz Khalifa",
      path: "./assets/music/playlist-2/13.mp3",
      image: "./assets/img/playlist-2/13.jpg",
    },
    {
      name: "Me And My Broken Heart",
      singer: "Rixton",
      path: "./assets/music/playlist-2/14.mp3",
      image: "./assets/img/playlist-2/14.jpg",
    },
    {
      name: "Stitches",
      singer: "Shawn Mendes",
      path: "./assets/music/playlist-2/15.mp3",
      image: "./assets/img/playlist-2/15.jpg",
    },
    {
      name: "Counting Stars",
      singer: "OneRepublic",
      path: "./assets/music/playlist-2/16.mp3",
      image: "./assets/img/playlist-2/16.jpg",
    },
    {
      name: "All About That Bass",
      singer: "Meghan Trainor",
      path: "./assets/music/playlist-2/17.mp3",
      image: "./assets/img/playlist-2/17.jpg",
    },
    {
      name: "TiK ToK",
      singer: "Kesha",
      path: "./assets/music/playlist-2/18.mp3",
      image: "./assets/img/playlist-2/18.jpg",
    },
    {
      name: "Hall of Fame (feat. will.i.am)",
      singer: "The Script, will.i.am",
      path: "./assets/music/playlist-2/19.mp3",
      image: "./assets/img/playlist-2/19.jpg",
    },
    {
      name: "HandClap",
      singer: "Fitz and The Tantrums",
      path: "./assets/music/playlist-2/20.mp3",
      image: "./assets/img/playlist-2/20.jpg",
    },
    {
      name: "Happy - From 'Despicable Me 2'",
      singer: "Pharrell Williams",
      path: "./assets/music/playlist-2/21.mp3",
      image: "./assets/img/playlist-2/21.jpg",
    },
    {
      name: "Twerk It Like Miley",
      singer: "Brandon Beal, Christopher",
      path: "./assets/music/playlist-2/22.mp3",
      image: "./assets/img/playlist-2/22.jpg",
    },
    {
      name: "The Fox (What Does the Fox Say?)",
      singer: "Ylvis",
      path: "./assets/music/playlist-2/23.mp3",
      image: "./assets/img/playlist-2/23.jpg",
    },
    {
      name: "High Hopes",
      singer: "Panic! At The Disco",
      path: "./assets/music/playlist-2/24.mp3",
      image: "./assets/img/playlist-2/24.jpg",
    },
    {
      name: "Great Balls Of Fire - Live",
      singer: "Miles Teller",
      path: "./assets/music/playlist-2/25.mp3",
      image: "./assets/img/playlist-2/25.jpg",
    },
    {
      name: "Beautiful Girls",
      singer: "Sean Kingston",
      path: "./assets/music/playlist-2/26.mp3",
      image: "./assets/img/playlist-2/26.jpg",
    },
    {
      name: "Young Dumb & Broke",
      singer: "Khalid",
      path: "./assets/music/playlist-2/27.mp3",
      image: "./assets/img/playlist-2/27.jpg",
    },
    {
      name: "In Case You Didn't Know",
      singer: "Brett Young",
      path: "./assets/music/playlist-2/28.mp3",
      image: "./assets/img/playlist-2/28.jpg",
    },
  ],
  playList3: [
    {
      name: "Vạn vật như muốn ta bên nhau",
      singer: "RIO",
      path: "./assets/music/playlist-3/1.mp3",
      image: "./assets/img/playlist-3/1.jpg",
    },
    {
      name: "Đợi",
      singer: "52Hz (prod. RIO)",
      path: "./assets/music/playlist-3/2.mp3",
      image: "./assets/img/playlist-3/2.jpg",
    },
    {
      name: "Dù cho mau về sau",
      singer: "buitruonglinh",
      path: "./assets/music/playlist-3/3.mp3",
      image: "./assets/img/playlist-3/3.jpg",
    },
    {
      name: "Sinh ra đã là thứ đối lập nhau",
      singer: "Emcee L (Da LAB) ft. Badbies",
      path: "./assets/music/playlist-3/4.mp3",
      image: "./assets/img/playlist-3/4.jpg",
    },
    {
      name: "Kho báu",
      singer: "(S)TRONG Trọng Hiếu",
      path: "./assets/music/playlist-3/5.mp3",
      image: "./assets/img/playlist-3/5.jpg",
    },
    {
      name: "Phép màu",
      singer: "MAYDAYs ",
      path: "./assets/music/playlist-3/6.mp3",
      image: "./assets/img/playlist-3/6.jpg",
    },
    {
      name: "Hẹn hò nhưng ko yêu",
      singer: "WENDY THẢO X V2T MEDIA ",
      path: "./assets/music/playlist-3/7.mp3",
      image: "./assets/img/playlist-3/7.jpg",
    },
    {
      name: "Anh đã chờ rất lâu",
      singer: "Sixkie Dawgz",
      path: "./assets/music/playlist-3/8.mp3",
      image: "./assets/img/playlist-3/8.jpg",
    },
    {
      name: "Mưa tháng sáu",
      singer: "VĂN MAI HƯƠNG (feat. GREY D, TRUNG QUÂN)",
      path: "./assets/music/playlist-3/9.mp3",
      image: "./assets/img/playlist-3/9.jpg",
    },
    {
      name: "Đưa em về nhà",
      singer: "GREY D",
      path: "./assets/music/playlist-3/10.mp3",
      image: "./assets/img/playlist-3/10.jpg",
    },
    {
      name: "Tháng tư là lời nói dối của em",
      singer: "Hà Anh Tuấn ",
      path: "./assets/music/playlist-3/11.mp3",
      image: "./assets/img/playlist-3/11.jpg",
    },
    {
      name: "Id 072019",
      singer: "W/n - id 072019 | 3107 ft 267",
      path: "./assets/music/playlist-3/12.mp3",
      image: "./assets/img/playlist-3/12.jpg",
    },
  ],
};

// ==========================
// APP
// ==========================
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  songs: [...PLAYLISTS.biTiNguyen],

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
      </div>`
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

  // ==========================
  // EVENTS
  // ==========================
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
        i.classList.remove("active")
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
