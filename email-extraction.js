const fs = require('fs');

// Read file and make array of words.
const fl = fs.readFileSync('test.txt', 'utf8');
const flArray = fl.split(/\s+/);

function getDomainSet() {
    const domainSearch = new RegExp('.@(.*\..*)');
    const domainList = [];
    for (let i = 0; i < flArray.length; i++) {
        const domain = flArray[i].match(domainSearch);
        if (domain) {
            domainList.push(domain[1]);
        }
    }
    return new Set(domainList);
}

function getDomainCounter(domainSet) {
    const dict = {};
    for (let item of domainSet) {
        dict[item] = 0;
    }
    return dict;
}

// loop back through and count up different domains
function updateDomainCounter(dict, domainSet) {
    for (let i = 0; i < flArray.length; i++) {
        for (let item of domainSet) {
            if (flArray[i].match('.*@' + item + '$')) {
                dict[item]++;
            }
        }
    }
    return dict;
}

const domainSet = getDomainSet();
const domainCounter = getDomainCounter(domainSet);
const result = updateDomainCounter(domainCounter, domainSet);

console.log(result);