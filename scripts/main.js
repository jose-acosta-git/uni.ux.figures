const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const forms = [];
const forms_max = 30;
const forms_size = 100;

init();

function init() {
    for (i = 0; i < forms_max; i++) {
        addForm(i < (forms_max / 2));
    }
    draw();
    canvas.addEventListener('mousedown', function(e) {
        console.log("canvas clicked");
        forms.forEach(form => {
            if (e.offsetX >= form.posX && e.offsetX <= form.posX + form.width &&
            e.offsetY >= form.posY && e.offsetY <= form.posY + form.height) {
                console.log("form clicked")
                canvas.addEventListener('mousemove', dragForm(form, e));
            }
        });
    });
}

function dragForm(form, e) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    form.posX = e.offsetX;
    form.posY = e.offsetY;

    draw();    
}

function addForm(style) {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();

    if (style) {
        const rect = new Rect(posX, posY, Math.round(Math.random() * forms_size), Math.round(Math.random() * forms_size), color, ctx, false);
        forms.push(rect);
    } else {
        const ellipse = new Ellipse(posX, posY, Math.round(Math.random() * forms_size), Math.round(Math.random() * forms_size), color, ctx, false);
        forms.push(ellipse);
    }
}

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function draw() {
    const rect = new Rect(0, 0, canvasWidth-1, canvasHeight-1, 'rgba(245, 245, 245, 255)' , ctx, true);
    rect.draw();
    
    for (let i = 0; i < forms_max; i++) {
        forms[i].draw();
    }
}