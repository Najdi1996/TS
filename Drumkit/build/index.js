//Dzwiek
var boomSound;
var clapSound;
var hihatSound;
var kickSound;
var operhantSound;
var rideSound;
var snareSound;
var tinkSound;
var tomSound;
//Play Channels
var channel1 = [];
var channel2 = [];
var channel3 = [];
var channel4 = [];
//Booleany odpowiedzialne za zezwolenie na nagrywanie kanalu
var isChannel1Record = false;
var isChannel2Record = false;
var isChannel3Record = false;
var isChannel4Record = false;
var recordStartTime;
//Wywolanie apki
appStart();
//Konstruktor
function appStart() {
    document.body.addEventListener('keypress', onKeyDown);
    setChannels();
    getSounds();
}
//Funkcja chwytajaca buttony channelow
function setChannels() {
    document.querySelector('#chnl1').addEventListener('click', onPlayChannel1);
    document.querySelector('#chnl2').addEventListener('click', onPlayChannel2);
    document.querySelector('#chnl3').addEventListener('click', onPlayChannel3);
    document.querySelector('#chnl4').addEventListener('click', onPlayChannel4);
    document.querySelector('#rchnl1').addEventListener('click', onRecordChannel1);
    document.querySelector('#rchnl2').addEventListener('click', onRecordChannel2);
    document.querySelector('#rchnl3').addEventListener('click', onRecordChannel3);
    document.querySelector('#rchnl4').addEventListener('click', onRecordChannel4);
    document.querySelector('#stopr').addEventListener('click', onStopRecord);
}
//Polaczenie dzwieku z HTML ze zmienna
function getSounds() {
    boomSound = document.querySelector('[data-sound="boom"]');
    clapSound = document.querySelector('[data-sound="clap"]');
    hihatSound = document.querySelector('[data-sound="hihat"]');
    kickSound = document.querySelector('[data-sound="kick"]');
    operhantSound = document.querySelector('[data-sound="operhant"]');
    rideSound = document.querySelector('[data-sound="ride"]');
    snareSound = document.querySelector('[data-sound="snare"]');
    tinkSound = document.querySelector('[data-sound="tink"]');
    tomSound = document.querySelector('[data-sound="tom"]');
}
//Odtworz Channel1
function onPlayChannel1() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
//Odtworz Channel2
function onPlayChannel2() {
    channel2.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
//Odtworz Channel3
function onPlayChannel3() {
    channel3.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
//Odtworz Channel4
function onPlayChannel4() {
    channel4.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
//Zezwól na nagranie kanału 1
function onRecordChannel1(ev) {
    channel1 = []; // Jezeli cos bylo wczesniej nagrane zostanie to wyczyszczone
    isChannel1Record = true;
    isChannel2Record = false;
    isChannel3Record = false;
    isChannel4Record = false;
    //Tylko jeden kanal moze byc nagrywany w danym czasie
    recordStartTime = ev.timeStamp;
}
//Zezwól na nagranie kanału 2
function onRecordChannel2(ev) {
    channel2 = [];
    isChannel1Record = false;
    isChannel2Record = true;
    isChannel3Record = false;
    isChannel4Record = false;
    recordStartTime = ev.timeStamp;
}
//Zezwól na nagranie kanału 3
function onRecordChannel3(ev) {
    channel3 = [];
    isChannel1Record = false;
    isChannel2Record = false;
    isChannel3Record = true;
    isChannel4Record = false;
    recordStartTime = ev.timeStamp;
}
//Zezwól na nagranie kanału 4
function onRecordChannel4(ev) {
    channel4 = [];
    isChannel1Record = false;
    isChannel2Record = false;
    isChannel3Record = false;
    isChannel4Record = true;
    recordStartTime = ev.timeStamp;
}
//Zatrzymaj nagrywanie
function onStopRecord() {
    isChannel1Record = false;
    isChannel2Record = false;
    isChannel3Record = false;
    isChannel4Record = false;
}
//Nagraj wybrany kanał
function RecordChannel(ev) {
    var key = ev.key;
    var stampTime = ev.timeStamp;
    var time = stampTime - recordStartTime;
    if (isChannel1Record == true) {
        channel1.push({ key: key, time: time });
    } //{key: key time:time}
    else if (isChannel2Record == true) {
        channel2.push({ key: key, time: time });
    }
    else if (isChannel3Record == true) {
        channel3.push({ key: key, time: time });
    }
    else if (isChannel4Record == true) {
        channel4.push({ key: key, time: time });
    }
}
//Funkcja reagujaca na wcisniecie klawiatury
function onKeyDown(ev) {
    var key = ev.key;
    console.log(ev);
    RecordChannel(ev);
    playSound(key);
}
//Odtworzenie dzwieku po kliknieciu
function playSound(key) {
    switch (key) {
        case 'a': {
            hihatSound.currentTime = 0;
            hihatSound.play();
            break;
        }
        case 's': {
            boomSound.currentTime = 0;
            boomSound.play();
            break;
        }
        case 'd': {
            clapSound.currentTime = 0;
            clapSound.play();
            break;
        }
        case 'f': {
            kickSound.currentTime = 0;
            kickSound.play();
            break;
        }
        case 'g': {
            operhantSound.currentTime = 0;
            operhantSound.play();
            break;
        }
        case 'q': {
            rideSound.currentTime = 0;
            rideSound.play();
            break;
        }
        case 'w': {
            snareSound.currentTime = 0;
            snareSound.play();
            break;
        }
        case 'e': {
            tinkSound.currentTime = 0;
            tinkSound.play();
            break;
        }
        case 'r': {
            tomSound.currentTime = 0;
            tomSound.play();
            break;
        }
    }
}
