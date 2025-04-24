const sounds = {
    'q' : document.querySelector("#s1"),
    'w' : document.querySelector("#s2"),
    'e' : document.querySelector("#s3"),
    'r' : document.querySelector("#s4"),
    'a' : document.querySelector("#s5"),
    's' : document.querySelector("#s6"),
    'd' : document.querySelector("#s7"),
    'f' : document.querySelector("#s8"),
    't' : document.querySelector("#s9"),
}

let tracks = {
    track1: { keys: [], times: [] },    
    track2: { keys: [], times: [] },    
    track3: { keys: [], times: [] },    
    track4: { keys: [], times: [] },    
}

let startTime = null
let currentTrack = null
const sound = document.getElementById("sound")

addEventListener('keypress',(qp) => {
    const key = qp.key
    const sound = sounds[key]
    if (sound) {
        sound.currentTime = 0;
        sound.play();
        if (currentTrack && startTime !== null) {
            const elapsedTime = Date.now() - startTime;
            tracks[currentTrack].keys.push(key);
            tracks[currentTrack].times.push(elapsedTime);
            console.log(`[${currentTrack}] recorded key "${key}" at ${elapsedTime}ms`);
        }
    }
})

function startRecording(trackName) {
    currentTrack = trackName;
    startTime = Date.now(); // rozpoczecie nagrywania
    tracks[currentTrack].keys = []; // reset klawiszy dla nowego nagrania
    tracks[currentTrack].times = []; // reset czasu dla nowego nagrania
    console.log(`Recording started for ${trackName}...`);
}

function stopRecording() {
    startTime = null; 
    currentTrack = null;
    console.log("Recording stopped.");
}

function playAllTracks() {
 playRecorded('track1')
 playRecorded('track2')
 playRecorded('track3')
 playRecorded('track4')
}

function playRecorded(trackName) {
    const { keys, times } = tracks[trackName];
    if (keys.length === 0) {
        console.log(`No recording found for ${trackName}.`);
        return;
    }
    let index = 0;
    function playNext() {
        if (index < keys.length) {
            const key = keys[index];
            const sound = sounds[key];
            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }
            index++;
            if(index< times.length) {
                setTimeout(playNext, times[index] - times[index -1]); // opoznienie nastepnego dzwieku
            }
    }
}
console.log(`Playing recorded track: ${trackName}`)
    playNext()
}