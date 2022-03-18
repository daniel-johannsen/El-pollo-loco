class MovableObject extends DrawableObject {
    speed = 0.15;
    speedCharacter = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 3.5;
    energy = 100;
    lastHit = 0;


    /**
     * This function is used to
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function is used to
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }


    /**
     * This function is used to
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This function is used to
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * This function is used to
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This function is used to
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * This function is used to
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall.
            return true;
        } else {
            return this.y < 175;
        }
    }


    /**
     * This function is used to
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById(..) <img id=".." src="..">
        this.img.src = path;
    }


    /**
     * This function is used to
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * This function is used to
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * This function is used to let fhe object move left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This function is used to let the object move right,
     */
    moveRight() {
        this.x += this.speed;
    }
}