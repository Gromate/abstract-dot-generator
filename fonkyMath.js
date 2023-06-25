//get random Int smaller than max
export function getRandomIntMax(max) {
    return Math.floor(Math.random() * max);
}

//get random Int between min and max
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function getRandomArbitraryMax(max) {
    return Math.random() * max;
}

export function smoothing(number) {
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

export function getRandomIntMaxSmoothing(max) {
    return Math.floor(smoothing(Math.random()) * max);
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
  
