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
let currentDescribeTitle;
function describe(title, test) {
    currentDescribeTitle = title;
    console.log('>', title);
    test.call(this);
}
function assertEqual(must, is, message) {
    message = message ? message : currentDescribeTitle;
    if (deepEqual(must, is)) {
        console.log('[x]', message, '(', is, '=', must, ')');
    }
    else {
        console.error('[ ]', message, '(', is, '!=', must, ')');
    }
    console.log('');
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
    assertEqual(true, ok instanceof OnApplyDe);
});
describe('getFiller returns nothing', () => {
    let ok = a.getFiller('someshit');
    if (!ok) {
        console.info('ok null');
    }
    else {
        console.error('ok', ok);
    }
    assertEqual(false, ok);
});
describe('OnApplyDe can fill()', () => {
    let onapply = new OnApplyDe(a.resume);
    onapply.fill(dom.window.document);
    assertEqual(dom.window.document, dom.window.document);
});
describe('zip test', () => {
    let zip = a.zip(['a', 'b', 'c'], ['a', 'b']);
    let must = { a: 'a', b: 'b', c: undefined };
    console.log(zip, must);
    assertEqual(must, zip);
});
describe('zip test with default', () => {
    let zip = a.zip(['a', 'b', 'c'], ['a', 'b'], 'default');
    let must = { a: 'a', b: 'b', c: 'default' };
    console.log(zip, must);
    assertEqual(must, zip);
});
describe('zip test with function', () => {
    let zip = a.zip(['a', 'b', 'c'], (item) => {
        // console.log('zip test with function', item);
        return item.charCodeAt(0);
    });
    let must = { a: 97, b: 98, c: 99 };
    console.log(zip, must);
    assertEqual(must, zip);
});
describe('BasicFilter->fillSelect', () => {
    const bs = new BasicFiller_1.BasicFiller(a.resume);
    let selTag;
    (function (document) {
        global['document'] = document; // found no other way
        console.log(document);
        let { select, option, hr } = require("docrel");
        let hrTag = hr();
        console.log(hr, hrTag);
        selTag = select.call(document, {}, [
            option({
                textContent: 'Madam'
            }),
            option({
                textContent: 'Herr'
            }),
            option({
                textContent: '3'
            }),
        ]);
    })(dom.window.document);
    console.log(selTag);
    const res = bs.fillSelect(selTag, 'Herr');
    console.log(res.innerHTML, res.selectedIndex);
    assertEqual(1, res.selectedIndex);
});
