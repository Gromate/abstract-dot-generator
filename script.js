//get random Int smaller than max
function getRandomIntMax(max) {
    return Math.floor(Math.random()*max);
}

//get random Int between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitraryMax(max) {
    return Math.random()*max;
}

function getRandomColor() {
    return `rgb(
        ${getRandomArbitraryMax(255)},
        ${getRandomArbitraryMax(255)},
        ${getRandomArbitraryMax(255)}
    )`
}

CanvasRenderingContext2D.prototype.circle = function(x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI*2, true);
    this.fill();
}

function draw() {
    const canvas = document.getElementById("canvas");
    canvas.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    canvas.width *= 0.9;
    canvas.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    canvas.height *= 0.9
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        for (let i=0; i < getRandomInt(10, 50); i++) {
            ctx.fillStyle = getRandomColor();
            const x = getRandomIntMax(ctx.canvas.width);
            const y = getRandomIntMax(ctx.canvas.height);
            const radius = getRandomIntMax(100);
            ctx.circle(x, y, radius);

        }

    }

}
draw();

function buttonRender() {
    draw();
}