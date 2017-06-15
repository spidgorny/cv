// Scrape a linkedin profile for the public contents
let linkedinScraper = require('./../node-linkedin-scraper2');
// let url = 'https://www.linkedin.com/in/katkoech/';
// let url = './../tests/fixture/https___www.linkedin.com_in_katkoech_.html';
let url = './../tests/fixture/https___www.linkedin.com_in_katkoech_private.html';
const fs = require('fs');
const html = fs.readFileSync(url).toString();
// console.log(html);

linkedinScraper(html)
	.then(function(profile) {
		console.log(profile);
	})
	.catch(function(err) {
		console.log(err);
	});
