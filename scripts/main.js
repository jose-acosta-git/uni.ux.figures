//Obtiene el canvas del DOM y el contexto del mismo
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Crea constantes y variables que se van a utilizar luego
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const forms = [];
const forms_max = 80;
const forms_size = 75;

let clicked = null;
let lastSelected = null;

init();

//Crea y dibuja las figuras y escucha eventos
function init() {
    for (i = 0; i < forms_max; i++) {
        addForm(i < (forms_max / 2));
    }
    draw();
    listenClick();
    listenDrag();
    listenUnClick();
    listenKeys();
}

//Escucha el evento de una tecla (flecha)
function listenKeys() {
    window.addEventListener('keydown', function(e) {
        if ( (lastSelected != null) && (e.key == 'ArrowDown' || e.key == 'ArrowUp' || e.key == 'ArrowLeft' || e.key == 'ArrowRight'))
            moveForm(e.key);
    });
}

//Mueve una figura de acuerdo a la tecla que se esté presionando
function moveForm(key) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    switch (key) {
        case 'ArrowDown':
            lastSelected.posY += 10;
            break;
        case 'ArrowUp':
            lastSelected.posY -= 10;
            break;
        case 'ArrowLeft':
            lastSelected.posX -= 10;
            break;
        default:
            lastSelected.posX += 10;
            break;
    }
    draw();
}

//Escucha el evento de un click y selecciona la figura clickeada
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

//Escucha el evento del movimiento del mouse
function listenDrag() {
    canvas.addEventListener('mousemove', function(e) {
        if (clicked != null)
            dragForm(e);
    });
}

//Escucha el evento de soltar el click
function listenUnClick() {
    canvas.addEventListener('mouseup', function (e) {
        clicked = null;
    });
}

//Mueve una figura de acuerdo a la posicion del cursor
function dragForm(e) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    clicked.posX = e.offsetX;
    clicked.posY = e.offsetY;

    draw();
}

//Crea una nueva figura con posición y tamaño aleatorios y la guarda
function addForm(style) {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();

    if (style) {
        const rect = new Rect(posX, posY, Math.round(Math.random() * forms_size), Math.round(Math.random() * forms_size), color, ctx);
        forms.push(rect);
    } else {
        const ellipse = new Ellipse(posX, posY, Math.round(Math.random() * forms_size), Math.round(Math.random() * forms_size), color, ctx);
        forms.push(ellipse);
    }
}

//Devuelve un color aleatorio en formato RGBA
function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//Vacía el canvas y vuelve a dibujar todas las figuras
function draw() {
    const rect = new Rect(0, 0, canvasWidth-1, canvasHeight-1, 'rgba(245, 245, 245, 255)' , ctx);
    rect.draw();
    
    for (let i = 0; i < forms_max; i++) {
        forms[i].draw();
    }
}