class Rect extends Form {

    constructor(posX, posY, width, height, fill, context, style) {
        super(posX, posY, width, height, fill, context, style);
    }

    draw() {
        this.context.fillStyle = this.fill;
        this.context.beginPath();
        this.context.rect(this.posX, this.posY, this.width, this.height);
        this.context.fill();
    }

    isClicked(x, y) {
        return (x >= this.posX && x <= this.posX + this.width && y >= this.posY && y <= this.posY + this.height);
    }

}