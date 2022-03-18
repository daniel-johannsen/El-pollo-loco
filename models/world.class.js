class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_X = 0;
    statusbarEnergy = new StatusbarEnergy();
    statusbarBottles = new StatusbarBottles();
    statusbarCoins = new StatusbarCoins();
    throwableObjects = [];
    bottle = new Bottle();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This function is used to hand over the worlt object to the character.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This function is used to run the checks every 200ms.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkCollisionBottleAndEnemy();
        }, 50)
        setInterval(() => {
            this.checkCollisionsWithEndboss();
            this.checkCollisionWithBottle();
            this.checkCollisionWithCoin();
            this.checkCollisionBottleAndEndboss();
            this.checkTrowableObjects();
        }, 150);
        setInterval(() => {
            this.checkCollisionBottleAndEndboss();
        }, 2800)
    }


    /**
     * This function is used to check if the bttle hits the endboss.
     */
    checkCollisionBottleAndEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (endboss.isColliding(bottle)) {
                    console.log('Enemy hit!');
                    endboss.endbossHurt();
                }
            });
        });
    }


    /**
     * This function is used to check if the bttle hits an enemy.
     */
    checkCollisionBottleAndEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    console.log('chicken dead, ', enemy.energy);
                    enemy.hitChicken();
                    setTimeout(() => {
                        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                    }, 4000);
                }
            });
        });
    }


    /**
     * This function is used to throw a bottle, if the character has one.
     */
    checkTrowableObjects() {
        if (this.keyboard.D) {
            if (this.statusbarBottles.amount > 0) {
                this.statusbarBottles.amount--;
                let bottle = new ThrowableObject(this.character.x + this.character.width, this.character.y + this.character.height / 2);
                this.throwableObjects.push(bottle);
                this.statusbarBottles.setAmount();
                this.checkCollisionBottleAndEnemy();
            }
        }
    }


    /**
     * This function is used to check if the charackter colides with a bottle and add it to the bottle statusbar.
     */
    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.statusbarBottles.amount++;
                this.statusbarBottles.setAmount();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                console.log('Collision with ', bottle);
            }
        });
    }


    /**
     * This function is used to check if the charackter colides with a coin and add it to the coin statusbar.
     */
    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.statusbarCoins.amount++;
                this.statusbarCoins.setAmount();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                console.log('Collision with ', coin);
            }
        });
    }


    /**
     * This function is used to check if the charackter colides with an anemy and lower his energy and animate the hit.
     */
    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                console.log('chicken dead');
                enemy.hitChicken();
            }
            if (this.character.isColliding(enemy) && enemy.chickenDead == false) {
                this.character.hit();
                this.statusbarEnergy.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * This function is used to check if the charackter colides with the endboss and lower his energy and animate the hit.
     */
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusbarEnergy.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * This function is used to draw the images on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_X, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_X, 0);
        this.addToMap(this.statusbarEnergy);
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarCoins);
        this.ctx.translate(this.camera_X, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_X, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    /**
     * This function is used to add the objects to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * This function is used to add images to the canvas.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * This function is used to flip the image of the character, if it moves baxk.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * This function is used to flip the image of the character back to the start direction.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}