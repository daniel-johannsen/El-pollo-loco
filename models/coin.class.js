class Coin extends DrawableObject {

    width = 100;
    height = 100;

    constructor() {
        super().loadImage('img/8.Coin/Moneda2.png');
        this.x = Math.random() * 500; //Number between 200 and 700
        this.y = 120 + Math.random() * 50; //Number between 200 and 700
    }
}