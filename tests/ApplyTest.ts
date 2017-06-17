const jsdom = require('jsdom');

// import {Apply} from "../extension/src/Apply";
const Apply = require("../extension/src/Apply").Apply;
// import OnApplyDe from "../extension/src/sites/OnApplyDe";
const OnApplyDe = require("../extension/src/sites/OnApplyDe").OnApplyDe;

const dom = new jsdom.JSDOM('<html></html>');
// console.log(dom.window.document);

const a = new Apply(dom.window.document);
let ok = a.getFiller('onapply.onapply.de');
if (ok == OnApplyDe) {
	console.info('ok OnApplyDe');
} else {
	console.error(ok);
	console.error(OnApplyDe);
}

ok = a.getFiller('someshit');
if (!ok) {
	console.info('ok null');
} else {
	console.error(ok);
}

let onapply = new OnApplyDe();
onapply.fill(dom.window.document, a.resume);
