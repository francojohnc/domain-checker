const fs = require('fs');
const msToTime = require('./msToTime');
const progress = require('./progress');
const lookup = require('./lookup');
const permutation = require('./permutation');

const logger = fs.createWriteStream('domains.txt', {flags: 'a'});

const buffer = fs.readFileSync('./src/letter.txt');
const letters = buffer.toString().trim().split('\n');

const words = permutation(letters, 5);

let index = 0;
const thread = 10;

let lastTime = new Date().getTime();

for (let i = 0; i < thread; i++) {
    loop();
}

function loop() {
    if (index === words.length) return;
    const word = words[index];
    index++;
    const domain = word + '.com';
    const time = new Date().getTime();
    const delta = time - lastTime;
    lastTime = time;
    const percent = index / words.length;
    lookup(domain)
        .then((response) => {
            callback({...response, current: index, percent, delta});
            loop();
        });
}

function callback(response) {
    const remain = response.delta * (words.length - response.current);
    console.clear();
    console.log('total: ' + words.length + ' of ' + response.current);
    console.log('estimate: ' + msToTime(remain));
    console.log('speed: ' + msToTime(response.delta));
    console.log('current: ' + response.domain);
    console.log(progress(response.percent));
    if (!response.exists) {
        logger.write(response.domain + '\n');
        // const date = new Date();
        // timeLog.write(date.toLocaleTimeString() + '\n');
    }
}

// check(words, callback);
