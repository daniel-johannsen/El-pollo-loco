class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 365;

    IMAGES_WALKING_CHICKEN = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png',
    ];

    currentImageChicken = 0;


    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');

        this.x = 200 + Math.random() * 500; //Number between 200 and 700

        this.loadImagesForChicken(this.IMAGES_WALKING_CHICKEN);

        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImageChicken % this.IMAGES_WALKING_CHICKEN.length;
            let path = this.IMAGES_WALKING_CHICKEN[i];
            this.img = this.imageCacheCicken[path];
            this.currentImageChicken++;
        }, 130);

        setInterval(() => {
            this.x -= 0.5;
        }, 1000 / 60);
    }
}