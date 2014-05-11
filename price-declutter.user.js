// ==UserScript==
// @name           Price declutter-er
// @description    Replace e.g. $199.99 with $200.00. Hover over text to see real price.
//
// @run-at         document-end
// @include        *
// @exclude	       *halifax-online.co.uk/*
// @grant          none
// ==/UserScript==

priceRegex = /(?:[£$€]|&#163;|&#36;|&#8364;)\d+\.\d\d/g;

prices = document.body.innerHTML.match(priceRegex);

if (prices != null)
{
	newBody = document.body.innerHTML;
	uniqPrices = removeDuplicates(prices);
	for (price of uniqPrices)
    {
		numStart = price.search(/\d+\./);
		currencySymbol = price.substr(0, numStart);
		value = price.substr(numStart);
		newPrice = currencySymbol + simplify(value);
		if (price != newPrice)
		{
			priceSpan = "<span title=\"" + price + "\">" + newPrice + "</span>";
			newBody = newBody.split(price).join(priceSpan); //replaceAll(price, priceSpan);
		}
    }
	document.body.innerHTML = newBody;
}

function removeDuplicates(arr)
{
	return arr.filter(function(elem, pos){
		return arr.indexOf(elem) == pos;
	});
}

function simplify(price)
{
	rounded = Number(price).toPrecision(2);
	return Number(rounded).toFixed(2);
}