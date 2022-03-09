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

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkcollisionsWithEnemy();
            this.checkTrowableObjects();
            this.checkCollisionWithBottle();
            this.checkCollisionWithCoin();
        }, 200);
    }

    checkTrowableObjects() {
        if (this.keyboard.D) {
            if (this.statusbarBottles.amount > 0) {
                this.statusbarBottles.amount--;
                let bottle = new ThrowableObject(this.character.x + this.character.width, this.character.y + this.character.height / 2);
                this.throwableObjects.push(bottle);
                this.statusbarBottles.setAmount();
            }
        }
    }

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

    checkcollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarEnergy.setPercentage(this.character.energy);
                console.log('Collision with ', enemy, this.character.energy);
            }
        });
    }

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
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_X, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}