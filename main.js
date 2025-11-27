const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");

const app = {
  currentIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: "Harleys In Hawaii",
      singer: "Katy Perry",
      path: "./assets/music/song1.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      name: "Kiss Me More (feat. SZA)",
      singer: "Doja Cat, SZA",
      path: "./assets/music/song2.mp3",
      image: "./assets/img/song2.jpg",
    },
    {
      name: "YAD",
      singer: "Vanna Rainelle",
      path: "./assets/music/song3.mp3",
      image: "./assets/img/song3.jpg",
    },
    {
      name: "Young And Beautiful",
      singer: "Lana Del Rey",
      path: "./assets/music/song4.mp3",
      image: "./assets/img/song4.jpg",
    },
    {
      name: "Play Date",
      singer: "Melanie Martinez",
      path: "./assets/music/song5.mp3",
      image: "./assets/img/song5.jpg",
    },
    {
      name: "Mind Games",
      singer: "Sickick",
      path: "./assets/music/song6.mp3",
      image: "./assets/img/song6.jpg",
    },
    {
      name: "Somewhere Only We Know",
      singer: "Gustixa, rhianne",
      path: "./assets/music/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
    {
      name: "Shinunoga E-Wa",
      singer: "Fujii Kaze",
      path: "./assets/music/song8.mp3",
      image: "./assets/img/song8.jpg",
    },
    {
      name: "Heat Waves",
      singer: "Glass Animals",
      path: "./assets/music/song9.mp3",
      image: "./assets/img/song9.jpg",
    },
    {
      name: "Love Story",
      singer: "Indila",
      path: "./assets/music/song10.mp3",
      image: "./assets/img/song10.jpg",
    },
    {
      name: "Cinnamon Girl",
      singer: "Lana Del Rey",
      path: "./assets/music/song11.mp3",
      image: "./assets/img/song11.jpg",
    },
    {
      name: "Blank Space",
      singer: "Taylor Swift",
      path: "./assets/music/song12.mp3",
      image: "./assets/img/song12.jpg",
    },
    {
      name: "Apocalypse",
      singer: "Cigarettes After Sex",
      path: "./assets/music/song13.mp3",
      image: "./assets/img/song13.jpg",
    },
    {
      name: "Kill Bill",
      singer: "SZA",
      path: "./assets/music/song14.mp3",
      image: "./assets/img/song14.jpg",
    },
    {
      name: "Those Eyes",
      singer: "New West",
      path: "./assets/music/song15.mp3",
      image: "./assets/img/song15.jpg",
    },
    {
      name: "End of Beginning",
      singer: "Djo",
      path: "./assets/music/song16.mp3",
      image: "./assets/img/song16.jpg",
    },
    {
      name: "Heather",
      singer: "Conan Gray",
      path: "./assets/music/song17.mp3",
      image: "./assets/img/song17.jpg",
    },
    {
      name: "Afterthought",
      singer: "Joji, BENEE",
      path: "./assets/music/song18.mp3",
      image: "./assets/img/song18.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
          <div class="thumb" style="background-image: url('${
            song.image
          }')"></div>
          <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
          </div>
          <div class="option"><i class="fas fa-ellipsis-h"></i></div>
      </div>
    `;
    });
    $(".playlist").innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const cdWidth = cd.offsetWidth;
    const _this = this;
    // Xử lý phóng to / thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    playBtn.onclick = function () {
      if (!_this.isPlaying) {
        _this.isPlaying = true;
        audio.play();
        player.classList.add("playing");
      } else {
        audio.pause();
      }
    };

    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
    };

    // Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      } else {
        progress.value = 0;
      }
    };

    // Xử lý khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Xử lý khi next song
    const nextBtn = $(".btn-next");
    nextBtn.onclick = function () {
      _this.currentIndex++;
      if (_this.currentIndex >= _this.songs.length) {
        _this.currentIndex = 0;
      }
      _this.loadCurrentSong();
      audio.play();
      _this.render();
    };

    // Xử lý khi prev song
    const prevBtn = $(".btn-prev");
    prevBtn.onclick = function () {
      _this.currentIndex--;
      if (_this.currentIndex < 0) {
        _this.currentIndex = _this.songs.length - 1;
      }
      _this.loadCurrentSong();
      audio.play();
      _this.render();
    };

    // Xử lý khi kết thúc bài hát
    audio.onended = function () {
      nextBtn.click();
    };

    // Lắng nghe hành vi click vào playlist
    const playlist = $(".playlist");
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }
      }
    };

    // Xử lý khi random song
    const randomBtn = $(".btn-random");
    randomBtn.onclick = function () {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * _this.songs.length);
      } while (newIndex === _this.currentIndex);
      _this.currentIndex = newIndex;
      _this.loadCurrentSong();
      audio.play();
      _this.render();
    };
  },

  getCurrentSong: function () {
    // Xử lý lấy ra bài hát hiện tại
    return this.songs[this.currentIndex];
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;

    cdThumb.classList.add("fade");
    setTimeout(() => {
      cdThumb.classList.remove("fade");
    }, 500);
  },
  start: function () {
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlist
    this.render();
  },
};

app.start();
