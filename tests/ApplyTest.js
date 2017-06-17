var jsdom = require('jsdom');
// import {Apply} from "../extension/src/Apply";
var Apply = require("../extension/src/Apply").Apply;
// import OnApplyDe from "../extension/src/sites/OnApplyDe";
var OnApplyDe = require("../extension/src/sites/OnApplyDe").OnApplyDe;
var dom = new jsdom.JSDOM('<html></html>');
// console.log(dom.window.document);
var a = new Apply(dom.window.document);
var ok = a.getFiller('onapply.onapply.de');
if (ok == OnApplyDe) {
    console.info('ok OnApplyDe');
}
else {
    console.error(ok);
    console.error(OnApplyDe);
}
ok = a.getFiller('someshit');
if (!ok) {
    console.info('ok null');
}
else {
    console.error(ok);
}
var onapply = new OnApplyDe();
onapply.fill(dom.window.document, a.resume);
