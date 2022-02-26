class Cloud extends MovableObject {

    y = 30;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = -20 + Math.random() * 500; //Number between 200 and 700
    }
}