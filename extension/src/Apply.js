// import {FieldConfig} from './FieldConfig';
const FieldConfig = require('./FieldConfig').FieldConfig;
export class Apply {
    constructor(document) {
        this.document = document;
        this.$ = this.document.querySelector.bind(this.document);
        this.$$ = selector => {
            // https://davidwalsh.name/nodelist-array
            const list = this.document.querySelectorAll(selector);
            return [].slice.call(list);
        };
        chrome.runtime.onMessage.addListener(this.messageHandler.bind(this));
        this.resume = require('./../fixture/thomasdavis.json');
        console.log(this.resume);
    }
    checkForm() {
        const selectors = this.getSelectors();
        if (selectors) {
            console.log(selectors);
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
            const fields = form.querySelectorAll('input,select,button,textarea');
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
        fields.forEach(field => {
            const config = new FieldConfig({
                'selector': this.getSelector(field),
                'tagName': field.tagName.toLowerCase(),
                'type': field.type,
                'class': field.className,
                'id': field.id,
                'labels': field.labels
                    ? [].slice.call(field.labels).map((el) => {
                        return el.innerText.trim();
                    }) : null,
            });
            collection.push(config);
        });
        return collection;
    }
    getSelector(field) {
        let selector = field.tagName.toLowerCase();
        if (field.id) {
            selector += '#' + field.id;
        }
        else if (field.name) {
            selector += '[name="' + field.name + '"]';
        }
        else if (field.className) {
            const classes = field.className.split(' ');
            selector += '.' + classes.join('.');
        }
        else if (field.type) {
            selector += '[type="' + field.type + '"]';
        }
        return selector;
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
        const zip = {};
        selectors.forEach((key, idx) => zip[key] = values[idx]);
        console.log(zip);
        const filler = this.getFiller(document.location.host);
        if (filler) {
            filler.fill(document, this.resume);
        }
        else {
            console.log("we don't know how to fill ", document.location.host);
        }
    }
    getFiller(host) {
        let filler;
        const map = {
            'onapply.de': 'OnApplyDe',
        };
        const one = Object.keys(map).filter((domain) => {
            return host.endsWith(domain);
        });
        if (one.length) {
            const className = map[one[0]]; // onapply.de => OnApplyDe
            filler = require('./sites/' + className);
            // filler = filler[className];
        }
        return filler;
    }
}
