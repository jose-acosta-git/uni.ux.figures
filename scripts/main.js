const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const forms = [];
const forms_max = 30;
const forms_size = 100;

let clicked = null;
let lastSelected = null;

init();

function init() {
    for (i = 0; i < forms_max; i++) {
        addForm(i < (forms_max / 2));
    }
    draw();
    listenClick();
    listenDrag();
    listenUnClick();
}

function listenClick() {
    canvas.addEventListener('mousedown', function(e) {
        for (let i = 0; i < forms.length; i++) {
            if (forms[i].isClicked(e.offsetX, e.offsetY)) {
                clicked = forms[i];
                lastSelected = clicked;
            }
        }
    });
}

function listenDrag() {
    canvas.addEventListener('mousemove', function(e) {
        if (clicked != null)
            dragForm(clicked, e);
    });
}

function listenUnClick() {
    canvas.addEventListener('mouseup', function (e) {
        clicked = null;
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