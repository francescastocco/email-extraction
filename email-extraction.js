const fs = require('fs');
const readline = require("readline-sync");

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

console.log('Please select the mode you want: \n1) All results \n2) Top 10 results \n3) More than n occurrences \n4) Grouped by domain');
const mode = Number(readline.prompt());

if (mode === 1) {
    console.log(result);
} else if (mode === 2) {
    console.log(pickHighest(result, 10));
} else if (mode === 3) {
    console.log('Please enter a number:')
    const hits = Number(readline.prompt());
    console.log(returnIfHigherThanN(result, hits));
} else if (mode === 4) {
    console.log(groupedResult);
} else {
    console.log("Invalid mode");
}



console.log(result);