import { Dot } from "./dot.js";
import * as fonkyMath from "./fonkyMath.js";
import { Palettes } from "./colorPalettes.js";

var sliderDotCount = document.getElementById("dotCount");
var outputDotCount = document.getElementById("outputDotCount");
outputDotCount.innerHTML = sliderDotCount.value;

var sliderDotScale = document.getElementById("dotScale");
var outputDotScale = document.getElementById("outputDotScale");
outputDotScale.innerHTML = sliderDotScale.value;

function getRandomColor() {
    return `rgb(
        ${fonkyMath.getRandomArbitraryMax(255)},
        ${fonkyMath.getRandomArbitraryMax(255)},
        ${fonkyMath.getRandomArbitraryMax(255)}
    )`
}

CanvasRenderingContext2D.prototype.circle = function (x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI * 2, true);
    this.fill();
}

function getRandomColorPalette(colorPalette) {
    return `#${colorPalette[Math.floor(Math.random() * colorPalette.length)]}`;
}


const colorPalette = ["E966A0", "2B2730", "6554AF", "9575DE"];
const color2 = ["164B60", "1B6B93", "4FC0D0", "A2FF86"];
const color3 = ["F6F1E9", "FFD93D", "FF8400", "4F200D"];
var dotScale = 50;
var dotCount = 50;
const dots = [];
const canvas = document.getElementById("canvas");

function draw() {
    canvas.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    canvas.width -= 16;
    canvas.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    canvas.height *= 0.9;
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        dotCount = sliderDotCount.value;
        dotScale = sliderDotScale.value;

        //Drawing white background
        ctx.fillStyle = `white`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        while (dots.length < dotCount) {
            const coordinates = daAlgo();
            dots.push(new Dot(
                coordinates[0],
                coordinates[1],
                Math.random(), //radius
                getRandomColorPalette(colorPalette) //color
            ));
        }

        while (dots.length > dotCount) {
            dots.pop();
        }

        for (var dot of dots) {
            ctx.fillStyle = dot.color;
            ctx.circle(dot.x, dot.y, dot.radius * dotScale);
        }

    }

}
draw();

function daAlgo() {
    var x, y;
    if (!Array.isArray(dots) || !dots.length) {
        //x = canvas.width/2;
        //y = canvas.height/2;
        x = fonkyMath.getRandomIntMax(canvas.width);
        y = fonkyMath.getRandomIntMax(canvas.height);
    } else {
        x = dots[dots.length-1].x;
        y = dots[dots.length-1].y;
    }

    var urgeToDraw = 0;
    const maxUrge = 20;
    const maxStepSize = 20;
    const xBias = -1;
    const yBias = -1;

    while (urgeToDraw < maxUrge) {
        x += fonkyMath.getRandomIntInclusive(-maxStepSize, maxStepSize)+xBias;
        y += fonkyMath.getRandomIntInclusive(-maxStepSize, maxStepSize)+yBias;
        urgeToDraw += fonkyMath.getRandomIntMax(maxStepSize);
    }

    if (x > canvas.width) {
        x -= canvas.width;
    }
    else if (x < 0) {
        x += canvas.width;
    }   
    if (y > canvas.height) {
        y -= canvas.height;
    }
    else if (y < 0) {
        y += canvas.height;
    }

    return [x,y];
}

function reroll() {
    while (dots.length > 0) {
        dots.pop();
    }
}

function rerollColors() {
    for (var dot of dots) {
        dot.color = getRandomColorPalette(colorPalette);
    }
}

//sliders functions
sliderDotCount.oninput = function () {
    outputDotCount.innerHTML = this.value;
    draw();
}

sliderDotScale.oninput = function () {
    outputDotScale.innerHTML = this.value;
    draw();
}

document.getElementById("buttonReload").addEventListener('click', () => {
    reroll();
    draw();
});

document.getElementById("buttonRerollColors").addEventListener('click', () => {
    rerollColors();
    draw();
});

function dlCanvas() {
    const dt = canvas.toDataURL('image/jpg');
    this.href = dt;
}

document.getElementById("dl").addEventListener('click', dlCanvas, false);