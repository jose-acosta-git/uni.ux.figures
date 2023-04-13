class Form {

    constructor(posX, posY, width, height, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fill = fill; 
        this.context = context;
    }

    draw(){}

    isClicked(){}

    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
}