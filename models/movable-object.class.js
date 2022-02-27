class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 250;
    width = 120;
    imageCache = {};
    imageCacheCicken = {};

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

    loadImagesForChicken(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCacheCicken[path] = img;
        });

    }

    moneRight() {
        console.log('move right');
    }

    moveLeft() {

    }
}