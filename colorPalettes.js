export const Palettes = Object.freeze({
    DEFAULT: ["E966A0", "2B2730", "6554AF", "9575DE"],
    FLIXBUX: ["164B60", "1B6B93", "4FC0D0", "A2FF86"],
    ORANJE: ["F6F1E9", "FFD93D", "FF8400", "4F200D"],
    PASTEL_RAINBOW: ["ffadad","ffd6a5","fdffb6","caffbf","9bf6ff","a0c4ff","bdb2ff","ffc6ff"],
    FREEZING_NIGHT: ["9ac5d3","141e26","cbd8df","159ab7","1e5067"],
    PINECONE: ["274001","f29f05","f25c05","a62f03","400d01"],
    JAMAICA: ["bb382c","dcba1d","256e35","242424"],
    BLACK_ORANGE: ["000000","1d495c","2a97b8","ff8800","f9f7f8"],
});

export function getRandomColorFromPalette(colorPalette) {
    return `#${colorPalette[Math.floor(Math.random() * colorPalette.length)]}`;
}

export function getRandomColor() {
    return `rgb(
        ${fonkyMath.getRandomArbitraryMax(255)},
        ${fonkyMath.getRandomArbitraryMax(255)},
        ${fonkyMath.getRandomArbitraryMax(255)}
    )`
}