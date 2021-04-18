class DrumKit{
    constructor(){
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentKick = "./sounds/snare-acoustic01.wav";
        this.currentKick = "./sounds/hihat-acoustic01.wav";
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.mutes = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.tempoNr = document.querySelector(".tempo-nr");
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
        console.log(this.mutes);
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over pads
        activeBars.forEach(bar =>{
            bar.style.animation=`playTrack 0.3s alternate ease-in-out 2`;
            //check if pads are ative
            if(bar.classList.contains('active')){
                //check each sound
                if(bar.classList.contains('first-pad')){
                    this.kickAudio.currentTime = 0; //permite tuturor padurilor sa produca sunet
                    this.kickAudio.play();
                }
                if(bar.classList.contains('second-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('third-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
        
    }
    start(){
        const interval = (60/this.bpm) * 1000; //sec -> milisecunde
        //check if is playing
        if(this.isPlaying === null){
            //playin
            this.isPlaying=setInterval(() =>{
                this.repeat();
            }, interval);
        }else{
            //reset
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn(){
        if(this.isPlaying !== null){
            this.playBtn.innerText="Stop";
            this.playBtn.classList.add("active");
        }else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        console.log(selectionName)
        switch(selectionName){
            case "first-select":
                this.kickAudio.src = selectionValue;
                break;
            case "second-select":
                this.snareAudio.src = selectionValue;
                break;
            case "third-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        }else{
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        this.updateBtn();
        this.bpm = e.target.value;
        this.tempoNr.innerText = e.target.value;
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad =>{
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    })
})
drumKit.playBtn.addEventListener('click', function(){
    drumKit.start();
    drumKit.updateBtn();

});

drumKit.selects.forEach(select =>{
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    })
})

drumKit.mutes.forEach(muteBtn =>{
    muteBtn.addEventListener('click', function(e){
        drumKit.mute(e)
    })
})

drumKit.tempoSlider.addEventListener("input", function(e){
    drumKit.changeTempo(e);
})

