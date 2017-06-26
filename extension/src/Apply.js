"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IndeedCom_1 = require("./sites/IndeedCom");
const JSONResume_1 = require("./JSONResume");
const OnApplyDe_1 = require("./sites/OnApplyDe");
const BMWGroupDe_1 = require("./sites/BMWGroupDe");
const JobsNintendoDe_1 = require("./sites/JobsNintendoDe");
const DaimlerCom_1 = require("./sites/DaimlerCom");
const DocumentFields_1 = require("./DocumentFields");
const TaleoNet_1 = require("./sites/TaleoNet");
const GoogleCom_1 = require("./sites/GoogleCom");
const util_1 = require("util");
const VolkswagenDe_1 = require("./sites/VolkswagenDe");
// const isBrowser = this.window === this;
const isBrowser = typeof window == 'object' && window.toString() == "[object Window]";
class Apply {
    constructor(document) {
        this.fillerMap = {
            'onapply.de': OnApplyDe_1.OnApplyDe,
            'indeed.com': IndeedCom_1.IndeedCom,
            'bmwgroup.de': BMWGroupDe_1.BMWGroupDe,
            'jobs.nintendo.de': JobsNintendoDe_1.JobsNintendoDe,
            'daimler.com': DaimlerCom_1.DaimlerCom,
            'taleo.net': TaleoNet_1.TaleoNet,
            'google.com': GoogleCom_1.GoogleCom,
            'volkswagen.de': VolkswagenDe_1.VolkswagenDe,
        };
        this.document = document;
        this.$ = this.document.querySelector.bind(this.document);
        this.$$ = selector => {
            // https://davidwalsh.name/nodelist-array
            const list = this.document.querySelectorAll(selector);
            return [].slice.call(list);
        };
        if (isBrowser) {
            chrome.runtime.onMessage.addListener(this.messageHandler.bind(this));
            document.defaultView['apply'] = this;
            document['apply'] = this;
        }
        this.resume = new JSONResume_1.JSONResume(require('./../fixture/thomasdavis.json'));
        // console.log(this.resume);
    }
    checkForm() {
        const selectors = this.getSelectors();
        if (selectors) {
            console.log('selectors', selectors.length);
            const json = this.zipMap(selectors, (selector) => {
                try {
                    return this.$(selector);
                }
                catch (e) {
                    if (e instanceof DOMException) {
                    }
                    else {
                        throw e;
                    }
                }
            }, '');
            console.log(json);
            //console.log(JSON.stringify(json, null, 4));
        }
        else {
            console.log('no forms on this page');
        }
    }
    getSelectorsFromFrames() {
        let allSelectors = [];
        let allFrames = [];
        allFrames = this.$$('iframe').map((item) => {
            let doc = null;
            // Error in event handler for runtime.onMessage: SecurityError: Blocked a frame with origin
            try {
                doc = item.contentWindow.document;
            }
            catch (e) {
                // ignore
            }
            return doc;
        });
        allFrames = allFrames.filter(el => {
            return !util_1.isNull(el); // remove empty due to the
        });
        allFrames.unshift(this.document); // if there are no iframes
        console.log('frames', allFrames.length);
        allFrames.forEach(frameDocument => {
            //console.log('frameDocument->input', frameDocument.querySelectorAll('input'));
            let df = new DocumentFields_1.DocumentFields(frameDocument);
            allSelectors.push({
                df: df,
                iframe: frameDocument,
                selectors: df.getSelectors(),
            });
        });
        return allSelectors;
    }
    getSelectors() {
        const allSelectors = this.getSelectorsFromFrames();
        console.log('allSelectors', allSelectors.length);
        let merged = [];
        allSelectors.forEach((el, idx) => {
            if (!el.selectors.length) {
                el.selectors = el.df.getSelectors();
            }
            console.log(el.iframe, el.selectors);
            console.log('frame', idx, 'concat', el.selectors.length);
            merged = merged.concat(el.selectors);
            console.log('merged', merged.length);
        });
        return merged;
    }
    messageHandler(request, sender, sendResponse) {
        // console.log(sender.tab ?
        // 	"from a content script:" + sender.tab.url :
        // 	"from the extension");
        switch (request.action) {
            case 'clickIcon':
                this.clickIcon(request, sendResponse);
                break;
            case 'showSelectors':
                this.showSelectors(request, sendResponse);
                break;
        }
    }
    clickIcon(request, done) {
        console.log('request', request);
        const selectors = this.getSelectors();
        // this.dumpSelectorValues(selectors);
        const filler = this.getFiller(document.location.host);
        console.log(filler);
        if (filler) {
            filler.fill(document);
        }
        else {
            console.log("we don't know how to fill ", document.location.host);
        }
        done();
    }
    dumpSelectorValues(selectors) {
        const values = selectors.map(selector => {
            try {
                const el = this.$(selector);
                if (el) {
                    if ('selectedIndex' in el) {
                        let option = el.options[el.selectedIndex];
                        if (option) {
                            return option.value;
                        }
                    }
                    else {
                        return el.value;
                    }
                }
            }
            catch (e) {
                if (e instanceof DOMException) {
                }
                else {
                    throw e;
                }
            }
        });
        const zip = this.zip(selectors, values);
        console.log(zip);
    }
    zip(selectors, values, defaultV = undefined) {
        const zip = {};
        selectors.forEach((key, idx) => {
            if (typeof values == 'function') {
                zip[key] = values(key, idx);
            }
            else {
                zip[key] = idx in values ? values[idx] : defaultV;
            }
        });
        return zip;
    }
    zipMap(selectors, values, defaultV = undefined) {
        const zip = new Map();
        selectors.forEach((key, idx) => {
            if (typeof values == 'function') {
                zip[key] = values(key, idx);
            }
            else {
                zip[key] = idx in values ? values[idx] : defaultV;
            }
        });
        return zip;
    }
    getFiller(host) {
        let filler;
        const one = Object.keys(this.fillerMap).filter((domain) => {
            return host.endsWith(domain);
        });
        if (one.length) {
            const className = this.fillerMap[one[0]]; // onapply.de => OnApplyDe
            //filler = require('./sites/' + className);
            //filler = filler[className];
            //filler = new this[className]();
            // filler = Object.create(className);
            filler = new className(this.resume);
        }
        return filler;
    }
    showSelectors(request, done) {
        const selectors = this.getSelectors();
        selectors.map(selector => {
            try {
                const el = this.$(selector);
                if (el && !el.value) {
                    el.value = selector;
                    if (el instanceof HTMLSelectElement) {
                        const optionName = document.createElement('option');
                        optionName.innerHTML = selector;
                        el.options.add(optionName);
                        el.selectedIndex = el.options.length - 1;
                    }
                }
            }
            catch (e) {
                if (e instanceof DOMException) {
                }
                else {
                    throw e;
                }
            }
        });
        done();
    }
}
exports.Apply = Apply;
