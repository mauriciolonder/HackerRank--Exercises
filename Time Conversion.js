'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Given a time in 12-hour AM/PM format, convert it to military (24-hour) time.
 * Note: - 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.- 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.
 * Example: '12:01:00PM'- Return '12:01:00'.
 * 
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {

    let calculate
    let result
    let hours = parseInt(s.slice(0, 2)) //get the number corresponding to the hours inside the string
    let minutes = s.slice(3, 5) //get the number corresponding to the minutes inside the string
    let seconds = s.slice(6, 8) //get the number corresponding to the seconds inside the string
    let am_pm = s.slice(8, 10) //get the string corresponding to AM or PM


    if (hours < 12 && am_pm != 'AM') {
        calculate = parseInt(hours + 12)
        result = calculate + ':' + minutes + ':' + seconds
        return result
    } else if (hours > 12) {
        calculate = parseInt(hours - 12)
        result = calculate + ':' + minutes + ':' + seconds
        return result
    } else if (hours == 12 && am_pm != 'PM') {
        result = String('00') + ':' + minutes + ':' + seconds
        return result
    } else if (hours == 24) {
        result = String('12') + ':' + minutes + ':' + seconds
        return result
    } else if (am_pm == 'AM') {
        result = String(0) + hours + ':' + minutes + ':' + seconds
        return result
    } else {
        result = hours + ':' + minutes + ':' + seconds
        return result
    }

}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}