const lookup = require('./lookup');

function check(words, callback, index) {
    if (words.length === index) {
        return Promise.resolve();
    }
    if (!words[index]) {
        return check(words, callback, index + 1);
    }
    const domain = words[index] + '.com';
    const time = new Date().getTime();
    return lookup(domain)
        .then((response) => {
            const current = index + 1;
            const delta = new Date().getTime() - time;
            const remain = delta * (words.length - current);
            const percent = current / words.length;
            callback({...response, current, remain, percent, domain});
            return check(words, callback, current);
        });
}

module.exports = function (words, callback) {
    check(words, callback, 0)
        .then(() => {

        });
};
