const fs = require('fs');
const csv = require('fast-csv');
const _ = require('underscore');

fs.createReadStream('football.dat')
    .pipe(csv.parse({headers:true}))
    .on('data', (footballData) => {
        getValues(_.values(footballData));
    }).on('end', () => {
        leastDifference()
    });

let football = {}
    
function getValues(footballData) {
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

let leastDifference = () => {
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
