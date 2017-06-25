"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldConfig_1 = require("./FieldConfig");
class DocumentFields {
    constructor(document) {
        this.document = document;
        this.$ = this.document.querySelector.bind(this.document);
        this.$$ = selector => {
            // https://davidwalsh.name/nodelist-array
            const list = this.document.querySelectorAll(selector);
            return [].slice.call(list);
        };
    }
    getSelectors() {
        const forms = this.$$('form');
        let form;
        if (forms.length == 1) {
            form = forms[0];
        }
        else if (forms.length = 0) {
            form = this.document;
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
        return [];
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
            const config = new FieldConfig_1.FieldConfig({
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
}
exports.DocumentFields = DocumentFields;
