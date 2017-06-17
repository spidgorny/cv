"use strict";
// import {FieldConfig} from './FieldConfig';
Object.defineProperty(exports, "__esModule", { value: true });
const FieldConfig = require('./FieldConfig').FieldConfig;
const JSONResume_1 = require("./JSONResume");
const OnApplyDe_1 = require("./sites/OnApplyDe");
// const isBrowser = this.window === this;
const isBrowser = typeof window == 'object' && window.toString() == "[object Window]";
class Apply {
    constructor(document) {
        this.document = document;
        this.$ = this.document.querySelector.bind(this.document);
        this.$$ = selector => {
            // https://davidwalsh.name/nodelist-array
            const list = this.document.querySelectorAll(selector);
            return [].slice.call(list);
        };
        if (isBrowser) {
            chrome.runtime.onMessage.addListener(this.messageHandler.bind(this));
        }
        this.resume = new JSONResume_1.JSONResume(require('./../fixture/thomasdavis.json'));
        // console.log(this.resume);
    }
    checkForm() {
        const selectors = this.getSelectors();
        if (selectors) {
            const json = this.zip(selectors, [], '');
            console.log(JSON.stringify(json, null, 4));
        }
        else {
            console.log('no forms on this page');
        }
    }
    getSelectors() {
        const forms = this.$$('form');
        let form;
        if (forms.length == 1) {
            form = forms[0];
        }
        else {
            form = this.findLargestForm(forms);
        }
        if (form) {
            let fields = form.querySelectorAll('input,select,button,textarea');
            fields = [].slice.call(fields);
            // console.log(fields);
            const config = this.extractForm(fields);
            // console.log(JSON.stringify(config, null, 4));
            const selectors = config.map((el) => {
                return el.selector;
            });
            return selectors;
        }
        return null;
    }
    findLargestForm(forms) {
        const mapLength = forms.map((el) => {
            return el.querySelectorAll('input,select,button,textarea').length;
        });
        const max = Math.max(...mapLength);
        const maxIndex = mapLength.indexOf(max);
        return forms[maxIndex];
    }
    extractForm(fields) {
        let collection = [];
        const allClasses = fields.map(el => {
            return el.className;
        });
        const classFrequency = this.getFrequency(allClasses);
        fields.forEach(field => {
            let labels = this.getLabels(field);
            const config = new FieldConfig({
                'selector': this.getSelector(field, labels, classFrequency),
                'tagName': field.tagName.toLowerCase(),
                'type': field.type,
                'class': field.className,
                'id': field.id,
                'labels': labels,
            });
            collection.push(config);
        });
        return collection;
    }
    getLabels(field) {
        return field.labels
            ? [].slice.call(field.labels).map((el) => {
                return el.innerText.trim();
            }) : null;
    }
    getSelector(field, labels, classFrequency) {
        let selector = field.tagName.toLowerCase();
        // avoid id with numbers
        if (field.id && !field.id.match(/[0-9]/)) {
            selector += '#' + field.id;
        }
        else if (field.name && !field.name.match(/[0-9]/)) {
            selector += '[name="' + field.name + '"]';
        }
        else if (field.className && classFrequency[field.className] == 1) {
            const classes = field.className.split(' ');
            selector += '.' + classes.join('.');
            // } else if (labels && labels.length) {
            // 	selector = 'label:contains("'+labels[0]+'") '+selector;
        }
        else if (field.name) {
            selector += '[name="' + field.name + '"]';
        }
        else if (field.id) {
            selector += '#' + field.id;
        }
        else if (field.type) {
            selector += '[type="' + field.type + '"]';
        }
        return selector;
    }
    getFrequency(array) {
        return array.reduce(this.countDuplicates, {});
    }
    countDuplicates(obj, num) {
        obj[num] = (++obj[num] || 1);
        return obj;
    }
    messageHandler(request, sender, sendResponse) {
        // console.log(sender.tab ?
        // 	"from a content script:" + sender.tab.url :
        // 	"from the extension");
        this.clickIcon(request);
        sendResponse({});
    }
    clickIcon(request) {
        console.log('request', request);
        const selectors = this.getSelectors();
        const values = selectors.map(selector => {
            const el = this.$(selector);
            return el.selectedIndex ? el.options[el.value].value : el.value;
        });
        const zip = this.zip(selectors, values);
        console.log(zip);
        const filler = this.getFiller(document.location.host);
        console.log(filler);
        if (filler) {
            filler.fill(document, this.resume);
        }
        else {
            console.log("we don't know how to fill ", document.location.host);
        }
    }
    zip(selectors, values, defaultV = undefined) {
        const zip = {};
        selectors.forEach((key, idx) => zip[key] = idx in values ? values[idx] : defaultV);
        return zip;
    }
    getFiller(host) {
        let filler;
        const map = {
            'onapply.de': OnApplyDe_1.OnApplyDe,
        };
        const one = Object.keys(map).filter((domain) => {
            return host.endsWith(domain);
        });
        if (one.length) {
            const className = map[one[0]]; // onapply.de => OnApplyDe
            //filler = require('./sites/' + className);
            //filler = filler[className];
            //filler = new this[className]();
            // filler = Object.create(className);
            filler = new className();
        }
        return filler;
    }
}
exports.Apply = Apply;
