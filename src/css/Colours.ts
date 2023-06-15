export default class Colours {
    static main1Dark = "#52295f";
    static main2Dark = "#6AABD7";
    static backgroundDark = "#0B1354";
    static fontColourDark = "#FFFFFF";


    static main1Light = "#F765A3";
    static main2Light = "#FFA4B6";
    static backgroundLight = "#f9d1d1";
    static fontColourLight = "#efefef";
}

export function invertColor(hex: string) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    console.log(r, g, b)
    console.log('#' + padZero(r) + padZero(g) + padZero(b))
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str: string, len:number = 2) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}