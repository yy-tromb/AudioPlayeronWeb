let url=document.getElementById("url");
let audio=document.getElementById("audio");
let btn=document.getElementById("btn");
let playB=document.getElementById("play");
let pauseB=document.getElementById("pause");
let bar =document.getElementById("bar");
let seek =document.getElementById("seek");
let len=audio.duration;
let lenEle=document.getElementById("lenEle")

audio.addEventListener("load",()=>{
  seek.max=audio.duration;
   lenEle.textContent=`${Math.floor(len/60)}:${Math.floor(len%60)}`;
});

audio.addEventListener("durationchange",()=>{
 seek.max=audio.duration;
 len=audio.duration;
 lenEle.textContent=`${Math.floor(len/60)}:${Math.floor(len%60)}`;

});

btn.addEventListener("click",()=>{
  audio.src=url.value;
  audio.load()
  pauseB.disabled=true;
  playB.disabled=false;
  bar.value=0;
  seek.value=0;
});

document.getElementById("backten").onclick=()=>{
  audio.currentTime=audio.currentTime-10;
};

document.getElementById("back").onclick=()=>{
  audio.currentTime=audio.currentTime-5;
};

document.getElementById("go").onclick=()=>{
  audio.currentTime=audio.currentTime+5;
};

document.getElementById("goten").onclick=()=>{
  audio.currentTime=audio.currentTime+10;
};

audio.addEventListener("ended",(e)=>{
  playB.disabled=false;
  pauseB.disabled=true;
});

playB.onclick=(e)=>{
  audio.play();
  e.target.disabled=true;
  pauseB.disabled=false;
};

pauseB.onclick=(e)=>{
  audio.pause();
  e.target.disabled=true;
  playB.disabled=false;
};

let time=document.getElementById("time");
let rate=document.getElementById("rate");

audio.addEventListener("timeupdate",()=>{
  const now=audio.currentTime;

  if(audio.playbackRate<1){
    time.textContent=`${Math.floor(now/60)}:${Number(now%60).toFixed(1)}`;
  }else{
  time.textContent=`${Math.floor(now/60)}:${Math.floor(now%60)}`;
  }

  bar.value=Number(now/len);
  seek.value=now;
});

rate.addEventListener("change",()=>{
  audio.playbackRate=rate.value;
});

seek.addEventListener("input",()=>{
  audio.currentTime=seek.value;
});

let file=document.getElementById("file");

document.getElementById("fileB").onclick=()=>{file.click();};

file.onchange=()=>{
  url.value=URL.createObjectURL(file.files[0]);
  btn.click();
  playB.style.backgroundColor="green";
  playB.addEventListener("click",flagoff);
    function flagoff(){
      playB.style.backgroundColor="";
      playB.removeEventListener("click",flagoff);
    }
};

document.getElementById("volume").addEventListener("input",(e)=>{
  audio.volume=e.target.value;
});

