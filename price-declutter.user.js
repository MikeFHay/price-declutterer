// ==UserScript==
// @name           Price declutter-er
// @description    Replace e.g. $199.99 with $200.00. Hover over text to see real price.
//
// @run-at         document-end
// @include        *
// @exclude        *halifax-online.co.uk/*
// @grant          none
// ==/UserScript==

function removeDuplicates(arr) {
    return arr.filter(function (elem, pos) {
        return arr.indexOf(elem) === pos;
    });
}

function simplify(price) {
    var rounded = Number(price).toPrecision(2);
    return Number(rounded).toFixed(2);
}

function main() {
    var priceRegex = /(?:[£$€]|&#163;|&#36;|&#8364;)\d+\.\d\d/g;
    var prices = document.body.innerHTML.match(priceRegex);

    if (prices !== null) {
        var newBody = document.body.innerHTML;
        var uniqPrices = removeDuplicates(prices);
        uniqPrices.forEach(function (price) {
            var numStart = price.search(/\d+\./);
            var currencySymbol = price.substr(0, numStart);
            var value = price.substr(numStart);
            var newPrice = currencySymbol + simplify(value);
            if (price !== newPrice) {
                var priceSpan = "<span title=\"" + price + "\">" + newPrice + "</span>";
                newBody = newBody.split(price).join(priceSpan); //replaceAll(price, priceSpan);
            }
        } );
        document.body.innerHTML = newBody;
    }
}

main();