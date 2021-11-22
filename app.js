var left = 1;

function show(){
    document.getElementById("i"+left).style.display="inline-block";
}

function moveright(){
    document.getElementById("i"+left).style.display="none";
    if(left>=3){
        left = 1;
    }
    else{
        left = left+1;
    }
    document.getElementById("i"+left).style.display="inline-block";
}
function moveleft(){
    document.getElementById("i"+left).style.display="none";
    if(left<=1){
        left = 3;
    }
    else{
        left = left-1;
    }
    document.getElementById("i"+left).style.display="inline-block";
}

moveright();
setInterval(moveright,3000);


/*------------------------------play / pause------------------------------------------------- */
let songIndex = 0;
let audioelement = new Audio('songs/1.mp3');
let masplay = document.getElementById('masterPlay');
let mpb = document.getElementById("myProgressBar");
let songs = [
    {songName:"Mann-Bharrya",filepath:"/songs/1.mp3"},
    {songName:"Lahore",filepath:"/songs/2.mp3"},
    {songName:"So-high",filepath:"/songs/3.mp3"},
    {songName:"Mercy",filepath:"/songs/4.mp3"},
    {songName:"Hasi-ban gaye",filepath:"/songs/5.mp3"},
]
masplay.addEventListener("click",()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        makeAllPlays();
        a = document.getElementById(songIndex);
        a.classList.add('fa-pause-circle');
        a.classList.remove('fa-play-circle');
        masplay.classList.remove('fa-play-circle');
        masplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.getElementById('sname').innerHTML = songs[songIndex].songName;
    }
    else{
        audioelement.pause();
        makeAllPlays();
        a = document.getElementById(songIndex);
        a.classList.remove('fa-pause-circle');
        a.classList.add('fa-play-circle');
        masplay.classList.remove('fa-pause-circle');
        masplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioelement.addEventListener("timeupdate",()=>{
    progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    mpb.value = progress;
})

mpb.addEventListener('change',()=>{
    audioelement.currentTime = (mpb.value*audioelement.duration)/100;
    
})



// ------------------------------------------next/previous---------------------------------


document.getElementById('next_song').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    console.log(songIndex)
    
    audioelement.src = `songs/${songIndex+1}.mp3`;
    makeAllPlays();
    audioelement.play();
    a = document.getElementById(songIndex);
    a.classList.remove('fa-play-circle');
    a.classList.add('fa-pause-circle');
    console.log(a);
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById('sname').innerHTML = songs[songIndex].songName;
    gif.style.opacity = 1;
})


    document.getElementById('previous_song').addEventListener('click', ()=>{
        if(songIndex<1){
            songIndex = 4;
        }
        else{
            songIndex -= 1;
        }
        console.log(songIndex);
        audioelement.src = `songs/${songIndex+1}.mp3`;
        
        audioelement.currentTime = 0;
        makeAllPlays();
        audioelement.play();
        a = document.getElementById(songIndex);
    a.classList.remove('fa-play-circle');
    a.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById('sname').innerHTML = songs[songIndex].songName;
    })


// ----------------------------------------playlist play/pause--------------------------------------------


    const makeAllPlays = ()=>{
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
    }
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.addEventListener('click', (e)=>{ 
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            console.log(songIndex);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioelement.src = `songs/${songIndex+1}.mp3`;

             document.getElementById('sname').innerText = songs[songIndex].songName;
            audioelement.currentTime = 0;
            audioelement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        })
    })

    

