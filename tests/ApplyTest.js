const jsdom = require('jsdom');
// import {Apply} from "../extension/src/Apply";
const Apply = require("../extension/src/Apply").Apply;
// import OnApplyDe from "../extension/src/sites/OnApplyDe";
const OnApplyDe = require("../extension/src/sites/OnApplyDe");
const dom = jsdom.env('<html></html>');
console.log(dom.document);
const a = new Apply(dom.document);
let ok = a.getFiller('onapply.onapply.de');
if (ok instanceof OnApplyDe) {
    console.info('ok OnApplyDe');
}
else {
    console.error(ok);
}
ok = a.getFiller('someshit');
if (!ok) {
    console.info('ok null');
}
else {
    console.error(ok);
}
