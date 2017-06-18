"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicFiller_1 = require("../extension/src/sites/BasicFiller");
const deepEqual = require('deep-equal');
const jsdom = require('jsdom');
// import {App_ly} from "../extension/src/Apply";
const { Apply } = require("../extension/src/Apply");
// import OnApplyDe from "../extension/src/sites/OnApplyDe";
const OnApplyDe = require("../extension/src/sites/OnApplyDe").OnApplyDe;
const dom = new jsdom.JSDOM('<html></html>');
// console.log(dom.window.document);
const a = new Apply(dom.window.document);
function describe(title, test) {
    console.warn('***', title, '***');
    test.call(this);
}
describe('getFiller returns an instance', () => {
    let ok = a.getFiller('onapply.onapply.de');
    if (ok instanceof OnApplyDe) {
        console.info('ok OnApplyDe');
    }
    else {
        console.error('ok', ok);
        console.error('typeof ok', typeof ok);
        console.error('OnApplyDe', OnApplyDe);
        console.error('typeof OnApplyDe', typeof OnApplyDe);
    }
});
describe('getFiller returns nothing', () => {
    let ok = a.getFiller('someshit');
    if (!ok) {
        console.info('ok null');
    }
    else {
        console.error('ok', ok);
    }
});
describe('OnApplyDe can fill()', () => {
    let onapply = new OnApplyDe();
    onapply.fill(dom.window.document, a.resume);
});
describe('zip test', () => {
    let zip = a.zip(['a', 'b', 'c'], ['a', 'b']);
    let must = { a: 'a', b: 'b', c: undefined };
    console.log(zip, must);
    console.log(deepEqual(zip, must) ? 'ok' : 'fail');
});
describe('zip test with default', () => {
    let zip = a.zip(['a', 'b', 'c'], ['a', 'b'], 'default');
    let must = { a: 'a', b: 'b', c: 'default' };
    console.log(zip, must);
    console.log(deepEqual(zip, must) ? 'ok' : 'fail');
});
describe('BasicFilter->fillSelect', () => {
    const bs = new BasicFiller_1.BasicFiller();
    let selTag;
    (function (document) {
        console.log(document);
        let { select, option } = require("docrel");
        selTag = select.call(document, {}, [
            option('Madam'),
            option('Herr'),
            option('3'),
        ]);
    })(dom.window.document);
    const res = bs.fillSelect(selTag, 'Herr');
    console.log(res);
});
