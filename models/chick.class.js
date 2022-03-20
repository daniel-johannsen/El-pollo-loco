class Chick extends MovableObject {
    width = 60;
    height = 60;
    y = 365;
    energy = 100;
    chickenDead = false;

    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png'
    ];

    IMAGES_DEAD = [
        'img/3.Secuencias_Enemy_básico/Versión_pollito/4.Muerte.png'
    ];

    constructor() {
        super().loadImage('');
        this.x = 400 + Math.random() * 2000;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.35 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * This function is used to lower the chick energy, if it is hurt
     */
    hitChicken() {
        this.chickenDead = true;
        this.energy -= 100;
        if (this.energy < 0) {
            this.energy = 0;
        }
        clearInterval(this.moveLeft);
    }


    /**
     * This function is used to animate the movement of the chickens.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 130);
    }
}