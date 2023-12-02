import { Dot } from "./dot.js";
import * as fonkyMath from "./fonkyMath.js";
import { Palettes } from "./colorPalettes.js";
import { getRandomColorFromPalette } from "./colorPalettes.js";

var sliderDotCount = document.getElementById("dotCount");
var outputDotCount = document.getElementById("outputDotCount");
outputDotCount.innerHTML = sliderDotCount.value;

var sliderDotScale = document.getElementById("dotScale");
var outputDotScale = document.getElementById("outputDotScale");
outputDotScale.innerHTML = sliderDotScale.value;

var sliderMaxUrge = document.getElementById("maxUrge");
var outputMaxUrge = document.getElementById("outputMaxUrge");
outputMaxUrge.innerHTML = sliderMaxUrge.value;

var sliderXBias = document.getElementById("xBias");
var outputXBias = document.getElementById("outputXBias");
outputXBias.innerHTML = sliderXBias.value;

var sliderYBias = document.getElementById("yBias");
var outputYBias = document.getElementById("outputYBias");
outputYBias.innerHTML = sliderYBias.value;

var selectColorPalette = document.getElementById("colorPalette");


CanvasRenderingContext2D.prototype.circle = function (x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI * 2, true);
    this.fill();
}

var dotScale = 50;
var dotCount = 50;
const dots = [];
const canvas = document.getElementById("canvas");

var maxUrge = 10;
var xBias = -1.0;
var yBias = -1.0;

var colorPalette = Palettes.DEFAULT;

function draw() {
    canvas.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    canvas.width -= 16;
    canvas.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    canvas.height *= 0.9;

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        dotCount = sliderDotCount.value;
        dotScale = sliderDotScale.value;

        maxUrge = sliderMaxUrge.value;
        xBias = parseFloat(sliderXBias.value);
        yBias = parseFloat(sliderYBias.value);

        //Drawing white background
        ctx.fillStyle = `white`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        while (dots.length < dotCount) {
            const coordinates = getNextCoordinates();
            dots.push(new Dot(
                coordinates[0],
                coordinates[1],
                Math.random(), //radius
                getRandomColorFromPalette(colorPalette) //color
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

/*
function chooses next coordinates with homemade function based on 
randomly choosing step size and direction
then rolling for urge to go again
it stops rolling when urge < maxUrge
*/
function getNextCoordinates() {
    var x, y;
    var urgeToDraw = 0;
    const StepSize = 10;

    if (!Array.isArray(dots) || !dots.length) {
        x = fonkyMath.getRandomIntMax(canvas.width);
        y = fonkyMath.getRandomIntMax(canvas.height);
    } else {
        x = dots[dots.length-1].x;
        y = dots[dots.length-1].y;
    }

    while (urgeToDraw < maxUrge) {
        x += fonkyMath.getRandomIntInclusive(-StepSize, StepSize)+xBias;
        y += fonkyMath.getRandomIntInclusive(-StepSize, StepSize)+yBias;
        urgeToDraw += fonkyMath.getRandomIntMax(StepSize);
    }   

    //clamping coordinates to canvas so if they go out of bounds they come up on the other side (snake like)
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
        dot.color = getRandomColorFromPalette(colorPalette);
    }
}



window.onload = function () {loadColorPalettes()};

function loadColorPalettes() {
    for (const key of Object.keys(Palettes)) {
        var option = document.createElement("option");
        option.value = key;
        option.text = key;
        selectColorPalette.appendChild(option);
    }
}

selectColorPalette.oninput = function () {
    const value = this.value;
    colorPalette = Palettes[value];
    rerollColors();
    draw();
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

sliderMaxUrge.oninput = function () {
    outputMaxUrge.innerHTML = this.value;
    reroll();
    draw();
}

sliderXBias.oninput = function () {
    outputXBias.innerHTML = this.value;
    reroll();
    draw();
}

sliderYBias.oninput = function () {
    outputYBias.innerHTML = this.value;
    reroll();
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