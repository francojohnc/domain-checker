const fs = require('fs');
const msToTime = require('./msToTime');
const progress = require('./progress');
const check = require('./check');

const logger = fs.createWriteStream('domains.txt', {flags: 'a'});

const words = ['google', 'beelihan', 'acerata', 'acerber', 'chafted'];

function callback(response) {
    console.clear();
    console.log('total: ' + words.length + ' of ' + response.current);
    console.log('estimate: ' + msToTime(response.remain));
    console.log('current: ' + response.domain);
    console.log(progress(response.percent));
    if (!response.exists) {
        logger.write(response.domain + '\n');
    }
}

check(words, callback);
