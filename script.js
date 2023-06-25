import { Dot } from "./dot.js";

var sliderDotCount = document.getElementById("dotCount");
var outputDotCount = document.getElementById("outputDotCount");
outputDotCount.innerHTML = sliderDotCount.value;

var sliderDotScale = document.getElementById("dotScale");
var outputDotScale = document.getElementById("outputDotScale");
outputDotScale.innerHTML = sliderDotScale.value;

//get random Int smaller than max
function getRandomIntMax(max) {
    return Math.floor(Math.random() * max);
}

//get random Int between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitraryMax(max) {
    return Math.random() * max;
}

function getRandomColor() {
    return `rgb(
        ${getRandomArbitraryMax(255)},
        ${getRandomArbitraryMax(255)},
        ${getRandomArbitraryMax(255)}
    )`
}


function smoothing(number) {
    if (number < 0.2) {
        return number * 2;
    }
    else if (number > 0.8) {
        return number * 2 - 1;
    }
    else {
        return number / 2 + 0.25;
    }
}

function getRandomIntMaxSmoothing(max) {
    return Math.floor(smoothing(Math.random()) * max);
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
function draw() {
    const canvas = document.getElementById("canvas");
    canvas.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    canvas.width -= 16;
    canvas.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    canvas.height *= 0.9;
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        dotCount = sliderDotCount.value;
        dotScale = sliderDotScale.value;

        while (dots.length <= dotCount) {
            dots.push(new Dot(
                getRandomIntMax(ctx.canvas.width), //x
                getRandomIntMax(ctx.canvas.height), //y
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