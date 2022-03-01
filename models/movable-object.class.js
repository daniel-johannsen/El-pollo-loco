class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 250;
    width = 120;
    imageCache = {};
    imageCacheCicken = {};
    currentImage = 0;
    speed = 0.15;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById(..) <img id=".." src="..">
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moneRight() {
        console.log('move right');
    }

    moveLeft() {

        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}