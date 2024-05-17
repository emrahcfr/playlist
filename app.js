const shuffleButton = document.getElementById("shuffle");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const repeatButton = document.getElementById("repeat");
const audio = document.getElementById("audio");
const playListButton = document.getElementById("playlist");
const songName = document.getElementById("song-name");
const songImage = document.getElementById("song-image");
const songArtist = document.getElementById("song-artist");
const progressBar = document.getElementById("progress-bar");
const currentProgress = document.getElementById("current-progress");
const currentTimeRef = document.getElementById("current-time");
const maxDuration = document.getElementById("max-duration");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

// sıra
let index;
// döngü
let loop = true;

// şarkı listesi

const songsList = [
  {
    name: "Zembilfıroş",
    link: "assets/zembilfroş.mp3",
    artist: "Jinda Kenco",
    image: "assets/şehriban.jpeg",
  },
  {
    name: "Gelo Ew Ki Bu",
    link: "assets/gelo-ew-ki-bu.mp3",
    artist: "Aram Tigran",
    image: "assets/aram-tigran.jpeg",
  },
  {
    name: "Gitme Kal",
    link: "assets/yara-bere-icindeyim.mp3",
    artist: "Hira-i Zerdust",
    image: "assets/hirai.jpeg",
  },
  {
    name: "Rolling In The Deep",
    link: "assets/Rolling in the deep.mp3",
    artist: "Adele",
    image: "assets/adele.png",
  },
  {
    name: "Aramam",
    link: "assets/aramam.mp3",
    artist: "Ibrahim Tatlises",
    image: "assets/ibrahim-tatlises.jpeg",
  },
  {
    name: "Ax Eman",
    link: "assets/ax-eman.mp3",
    artist: "Rewsan Celiker",
    image: "assets/rewsan-celiker.jpeg",
  },
  {
    name: "Dinle",
    link: "assets/dinle.mp3",
    artist: "Mahsun Kirmizigul",
    image: "assets/mahsun.jpeg",
  },
  {
    name: "Barane",
    link: "assets/mem-ararat-li-heviya-barane.mp3",
    artist: "Mem Ararat",
    image: "assets/mem.jpg",
  },
  {
    name: "Çiçeke",
    link: "assets/mem-ararat-ciceke.mp3",
    artist: "Mem Ararat",
    image: "assets/mem-single.jpg",
  },
  {
    name: "Genç Xelil",
    link: "assets/genç Xelil.mp3",
    artist: "Hozan Aydın",
    image: "assets/aydın.jpeg",
  },
  {
    name: "Macire",
    link: "assets/Macire.mp3",
    artist: "Hozan Aydın",
    image: "assets/aydın.jpeg",
  },
  {
    name: "Beje",
    link: "assets/Beje.mp3",
    artist: "Hozan Aydın",
    image: "assets/aydın.jpeg",
  },
  {
    name: "Hewlere",
    link: "assets/Hewlere.mp3",
    artist: "Hozan Aydın",
    image: "assets/aydın.jpeg",
  },
  {
    name: "Lori",
    link: "assets/Lori.mp3",
    artist: "Hozan Aydın",
    image: "assets/aydın.jpeg",
  },
  {
    name: "Dıl Dısoje",
    link: "assets/Mem-ararat-Dil-Disoje.mp3",
    artist: "Mem Ararat",
    image: "assets/mem-single.jpg",
  },
  {
    name: "Xum Xume",
    link: "assets/mem-ararat-xum-xume.mp3",
    artist: "Mem Ararat",
    image: "assets/mem-single.jpg",
  },
];
// şarkı atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata=()=>{
    maxDuration.innerText=timeFormatter(audio.duration)
  }

  playAudio();
  playListContainer.classList.add('hide')
};
// ilerleme çubuğu
progressBar.addEventListener('click', (event)=>{
    let coordStart=progressBar.getBoundingClientRect().left

    let coorEnd = event.clientX;
    let progress= (coorEnd - coordStart)/progressBar.offsetWidth

    currentProgress.style.width= progress * 100 + '%';
    audio.currentTime = progress * audio.duration;

    playAudio()
});

// zaman tutucu
setInterval(() => {
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);
// şarkıyı oynat
const playAudio = () => {
  audio.play();
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};
// sonraki şarkı
const nextSong = () => {
  if (loop) {
    // döngü açıksa
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    // karıştırıcı açıksa
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};
// önceki şarkı
const previousSong = () => {
  pauseAudio();
  if (index > 0) {
    index = index - 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
};
// şarkı bittiğinde diğerine geç
audio.onended = () => {
  nextSong();
};
// zaman format düzenlemesi
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? '0' + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? '0' + second : second
    return `${minute}:${second}`
}

//sarki suresi degistikce
audio.addEventListener('timeupdate',()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})
// şarkı listesi oluştur
const initPlaylist=()=>{
    for (const i in songsList) {
        playListSongs.innerHTML+= `<li class= "playlistSong"
         onclick= "setSong(${i})">
         <div class= "playlist-image-container">
         <img src="${songsList[i].image}"/>
         </div>
         <div class = " playlist-song-details">
         <span id="playlist-song-name">
         ${songsList[i].name} </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist} </span>
         </div>
         </li>`
    }
}
//Oynatma Listesini Gösterme
playListButton.addEventListener('click', ()=>{
    playListContainer.classList.remove('hide');
});
// Oynatma Listesini Kapatma

closeButton.addEventListener('click', ()=>{
  playListContainer.classList.add('hide')
});
// oynatma listesinden şarkılara basıp çalma
// playListSongs.addEventListener('click', ()=>{
//   playAudio()
// })


window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initPlaylist()
};



//oynata tıklanıldığında
playButton.addEventListener("click", playAudio);
// pause butonuna tıklanıldığında
pauseButton.addEventListener("click", pauseAudio);

// next buttona tıklanıldığında
nextButton.addEventListener("click", nextSong);
// prev buttona tıklanıldığında
prevButton.addEventListener("click", previousSong);
// tekrar tıklanıldığında
repeatButton.addEventListener('click', ()=>{
    if (repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active');
        audio.loop= false
    }else{
        repeatButton.classList.add('active')
        audio.loop= true
    }
});
// karıştırıcı tıklanıldığında
shuffleButton.addEventListener('click', ()=>{
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop=true;
        console.log("karıştırma açık");
    } else {
        shuffleButton.classList.add('active');
        loop = false;
        console.log("karıştırma kapalı");
    }
});
