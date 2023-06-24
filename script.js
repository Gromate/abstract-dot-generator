function genRandomInteger(max) {
    return Math.floor(Math.random()*max);
}

CanvasRenderingContext2D.prototype.circle = function(x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI*2, true);
    this.stroke();
}

function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        for (let i=0; i < 10; i++) {
            const x = genRandomInteger(canvas.getAttribute('width'));
            const y = genRandomInteger(canvas.getAttribute('height'));
            const radius = genRandomInteger(50);
            ctx.circle(x, y, radius);

        }

    }

}
draw();
