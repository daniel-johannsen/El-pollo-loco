class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 365;

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');

        this.x = 200 + Math.random() * 500; //Number between 200 and 700
    }
}