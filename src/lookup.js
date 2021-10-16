const dns = require('dns');
const whoiser = require('whoiser');

function delay(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function lookup(domain) {
    return new Promise(resolve => {
        dns.lookup(domain, (error, address) => {
            if (error) {
                whoiser(domain)
                    .then(result => {
                        const error = result['whois.verisign-grs.com']['error'];
                        if (error) {
                            delay(5000)
                                .then(() => lookup(domain))
                                .then(result => resolve(result));
                        } else {
                            const exists = !!result['whois.verisign-grs.com']['Domain Name'];
                            resolve({domain, address, exists});
                        }
                    })
                    .catch(error => {
                        delay(5000)
                            .then(() => lookup(domain))
                            .then(result => resolve(result));
                    });
            } else {
                resolve({domain, address, exists: true});
            }
        });
    });
}

module.exports = lookup;
