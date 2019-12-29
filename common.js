const fs = require('fs');
const csv = require('fast-csv');
const _ = require('underscore');

fs.createReadStream('football.dat')
    .pipe(csv.parse({headers:true}))
    .on('data', (footballData) => {
        getValues_football(_.values(footballData));
    }).on('end', () => {
        leastDifference_football()
    });

let football = {}
    
function getValues_football(footballData) {
    let data = footballData[0].split(' ');
    let values = [];
    for (let value of data) {
        if (value !== '') {
            values.push(value);
        }
    }
    
    for(let value of values) {
        if (football[values[1]] == undefined) {
            football[values[1]] = {};
        }
        football[values[1]]['for']= values[6]
        football[values[1]]['against']= values[8]
    }
    return football
}

let leastDifference_football = () => {
    let min =99999;
    let team ;
    for(const key in football) {
        if (Math.abs(Number(football[key]['for']) - Number(football[key]['against'])) < min)  {
            team = key;
            min = Math.abs(Number(football[key]['for']) - Number(football[key]['against']));
        } 
        if (Math.abs(Number(football[key]['against']) - Number(football[key]['for'])) < min)  {
            team = key;
            min = Math.abs(Number(football[key]['against']) - Number(football[key]['for']));
        }
    }
    console.log(`Team ${team} has the least goal difference of ${min}`)
}


fs.createReadStream('weather.dat')
    .pipe(csv.parse({headers:true}))
    .on('data', (weatherData) => {
        getValues(_.values(weatherData));
    }).on('end', () => {
        leastDifference()
    });

let weather = {}
    
function getValues(weatherData) {
    let data = weatherData[0].split(' ');
    let values = [];
    for (let value of data) {
        if (value !== '') {
            values.push(value);
        }
    }
    
    for(let value of values) {
        if (weather[values[0]] == undefined) {
            weather[values[0]] = {};
        }
        weather[values[0]]['max']= values[1]
        weather[values[0]]['min']= values[2]
    }
    return weather;
}

let leastDifference = () => {
    let min =99999;
    let day ;
    for(const key in weather) {
        if (Number(weather[key]['max']) - Number(weather[key]['min']) < min) {
            day = key;
            min = Number(weather[key]['max']) - Number(weather[key]['min']);
        } 
    }
    console.log(`Day ${day} has the least spread of ${min}`)
}
