console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Besabriyaan - Armaan Malik", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ittefaq Se - Jubin Nautiyal", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Saanson Ko - Arijit Singh ", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Sanam Re - Arijit Singh ", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Yeh Fitoor Mera - Arijit Singh", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Nashe Si Chadh Gayi - Arijit Singh", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Raaz Aankhein Teri - Arijit Singh", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Te Amo - Ash King and Sunidhi Chauhan", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Gazab Ka Hai Yeh Din -  Arijit Singh & Amaal Mallik", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Pad Gaye Ji - KK and Sunidhi Chauhan", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

songs.forEach((song, idx) => { 
    let audio = new Audio(song.filePath);
    audio.addEventListener('loadedmetadata', function() {
        let durationElement = document.createElement('span');
        durationElement.classList.add('timestamp')
        durationElement.innerText = formatTime(audio.duration);
        document.querySelector(`#songs_${idx}`).prepend(durationElement);

    });
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if (e.target.classList.contains('fa-circle-play')) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            songIndex = parseInt(e.target.id);
            audioElement.currentTime = 0;
            audioElement.pause();

            gif.style.opacity = 0;
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');

        }
       
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})