let canvas;
let world;
let keyboard = new Keyboard();
let playMusic1 = new Audio('audio/music1.mp3');
let playMusic2 = new Audio('audio/music2.mp3');
let musicOn = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    start();

}

function start() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('btn').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('left').classList.remove('d-none');
    document.getElementById('right').classList.remove('d-none');
    document.getElementById('jump').classList.remove('d-none');
    document.getElementById('throw').classList.remove('d-none');
}

function info() {
    document.getElementById('infoBox').classList.toggle('d-none');
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});


function touchDownLeft() {
    keyboard.LEFT = true;
}


function touchUpLeft() {
    keyboard.LEFT = false;
}

//##
function touchDownRight() {
    keyboard.RIGHT = true;
}


function touchUpRight() {
    keyboard.RIGHT = false;
}

//##
function touchDownJump() {
    keyboard.SPACE = true;
}


function touchUpJump() {
    keyboard.SPACE = false;
}

//##
function touchDownThrow() {
    keyboard.D = true;
}


function touchUpThrow() {
    keyboard.D = false;
}


function music1() {
    if (musicOn == false) {
        musicOn = true;
    } else {
        musicOn = false;
    }
    playMusicFunction1();
}


function music2() {
    if (musicOn == false) {
        musicOn = true;
    } else {
        musicOn = false;
    }
    playMusicFunction2();
}


function playMusicFunction1() {
    if (musicOn == true) {
        playMusic1.play();
    }
    if (musicOn == false) {
        playMusic1.pause();
    }
}

function playMusicFunction2() {
    if (musicOn == true) {
        playMusic2.play();
    }
    if (musicOn == false) {
        playMusic2.pause();
    }
}