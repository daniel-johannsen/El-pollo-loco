class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 250;
    width = 120;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById(..) <img id=".." src="..">
        this.img.src = path;
    }

    moneRight() {
        console.log('move right');
    }

    moveLeft() {

    }
}