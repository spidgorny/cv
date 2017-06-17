"use strict";
// import {FieldConfig} from './FieldConfig';
Object.defineProperty(exports, "__esModule", { value: true });
var FieldConfig = require('./FieldConfig').FieldConfig;
var JSONResume_1 = require("./sites/JSONResume");
var isBrowser = this.window === this;
var Apply = (function () {
    function Apply(document) {
        var _this = this;
        this.document = document;
        this.$ = this.document.querySelector.bind(this.document);
        this.$$ = function (selector) {
            // https://davidwalsh.name/nodelist-array
            var list = _this.document.querySelectorAll(selector);
            return [].slice.call(list);
        };
        if (isBrowser) {
            chrome.runtime.onMessage.addListener(this.messageHandler.bind(this));
        }
        this.resume = new JSONResume_1.JSONResume(require('./../fixture/thomasdavis.json'));
        // console.log(this.resume);
    }
    Apply.prototype.checkForm = function () {
        var selectors = this.getSelectors();
        if (selectors) {
            console.log(selectors);
        }
        else {
            console.log('no forms on this page');
        }
    };
    Apply.prototype.getSelectors = function () {
        var forms = this.$$('form');
        var form;
        if (forms.length == 1) {
            form = forms[0];
        }
        else {
            form = this.findLargestForm(forms);
        }
        if (form) {
            var fields = form.querySelectorAll('input,select,button,textarea');
            // console.log(fields);
            var config = this.extractForm(fields);
            // console.log(JSON.stringify(config, null, 4));
            var selectors = config.map(function (el) {
                return el.selector;
            });
            return selectors;
        }
        return null;
    };
    Apply.prototype.findLargestForm = function (forms) {
        var mapLength = forms.map(function (el) {
            return el.querySelectorAll('input,select,button,textarea').length;
        });
        var max = Math.max.apply(Math, mapLength);
        var maxIndex = mapLength.indexOf(max);
        return forms[maxIndex];
    };
    Apply.prototype.extractForm = function (fields) {
        var _this = this;
        var collection = [];
        fields.forEach(function (field) {
            var config = new FieldConfig({
                'selector': _this.getSelector(field),
                'tagName': field.tagName.toLowerCase(),
                'type': field.type,
                'class': field.className,
                'id': field.id,
                'labels': field.labels
                    ? [].slice.call(field.labels).map(function (el) {
                        return el.innerText.trim();
                    }) : null,
            });
            collection.push(config);
        });
        return collection;
    };
    Apply.prototype.getSelector = function (field) {
        var selector = field.tagName.toLowerCase();
        if (field.id) {
            selector += '#' + field.id;
        }
        else if (field.name) {
            selector += '[name="' + field.name + '"]';
        }
        else if (field.className) {
            var classes = field.className.split(' ');
            selector += '.' + classes.join('.');
        }
        else if (field.type) {
            selector += '[type="' + field.type + '"]';
        }
        return selector;
    };
    Apply.prototype.messageHandler = function (request, sender, sendResponse) {
        // console.log(sender.tab ?
        // 	"from a content script:" + sender.tab.url :
        // 	"from the extension");
        this.clickIcon(request);
        sendResponse({});
    };
    Apply.prototype.clickIcon = function (request) {
        var _this = this;
        console.log('request', request);
        var selectors = this.getSelectors();
        var values = selectors.map(function (selector) {
            var el = _this.$(selector);
            return el.selectedIndex ? el.options[el.value].value : el.value;
        });
        var zip = {};
        selectors.forEach(function (key, idx) { return zip[key] = values[idx]; });
        console.log(zip);
        var filler = this.getFiller(document.location.host);
        if (filler) {
            filler.fill(document, this.resume);
        }
        else {
            console.log("we don't know how to fill ", document.location.host);
        }
    };
    Apply.prototype.getFiller = function (host) {
        var filler;
        var map = {
            'onapply.de': 'OnApplyDe',
        };
        var one = Object.keys(map).filter(function (domain) {
            return host.endsWith(domain);
        });
        if (one.length) {
            var className = map[one[0]]; // onapply.de => OnApplyDe
            filler = require('./sites/' + className);
            filler = filler[className];
        }
        return filler;
    };
    return Apply;
}());
exports.Apply = Apply;
