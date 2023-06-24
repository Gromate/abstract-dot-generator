import { Dot } from "./dot.js";

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


function smoothing(number) {
    if (number < 0.2) {
        return number*2;
    } 
    else if (number > 0.8) {
        return number*2-1;
    }
    else {
        return number/2+0.25;
    }
}
function getRandomIntMaxSmoothing(max) {
    return Math.floor(smoothing(Math.random())*max);
}

CanvasRenderingContext2D.prototype.circle = function(x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI*2, true);
    this.fill();
}

function getRandomColorPalette(colorPalette) {
    return `#${colorPalette[Math.floor(Math.random()*colorPalette.length)]}`;
}


const colorPalette = ["E966A0", "2B2730","6554AF", "9575DE"];
const color2 = ["164B60", "1B6B93","4FC0D0", "A2FF86"];
const color3 = ["F6F1E9", "FFD93D","FF8400", "4F200D"];
var dotCount = 50;
const dots = [];
function draw() {
    const canvas = document.getElementById("canvas");
    canvas.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    canvas.width *= 0.9;
    canvas.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    canvas.height *= 0.9
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        while(dots.length <= dotCount) {
            dots.push(new Dot(
                getRandomIntMax(ctx.canvas.width),
                getRandomIntMax(ctx.canvas.height),
                getRandomIntMax(100),
                getRandomColorPalette(colorPalette)
            ));
        }

        while(dots.length > dotCount) {
            dots.pop();
        }

        for (var dot of dots) {
            console.log(dot.toString())
            ctx.fillStyle = dot.color;
            ctx.circle(dot.x, dot.y, dot.radius);
        }

    }

}
draw();

function buttonRender() {
    draw();
}

var slider = document.getElementById("dotCount");
var output = document.getElementById("outputDotCount");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    dotCount = this.value;
    draw();
} 