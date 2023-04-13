class Form {

    constructor(posX, posY, width, height, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fill = fill; 
        this.context = context;
    }

    //Dibuja la figura
    draw(){}

    //Devuelve true si las coordenadas del mouse coinciden con las de la figura
    isClicked(){}

    //Cambia las coordenadas de la figura
    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
}