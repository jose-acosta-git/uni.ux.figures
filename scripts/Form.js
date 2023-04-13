class Form {

    constructor(posX, posY, width, height, fill, context, style) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fill = fill; 
        this.context = context;
        this.style = style;
    }

    draw(){}

    isClicked(){}

    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    selected(style) {
        this.style = style;
    }
}