"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicFiller {
    fill(document, resume) {
        Object.keys(this.map).forEach((selector) => {
            const path = this.map[selector];
            const value = resume.findDeep(path);
            console.log(selector, path, value);
            const el = document.querySelector(selector);
            if (el) {
                if (el.tagName.toUpperCase() == 'SELECT') {
                    this.fillSelect(el, value, Array.isArray(value) ? value : [value]);
                }
                else if (el.type.toUpperCase() == 'CHECKBOX') {
                    this.fillCheckbox(el, value);
                }
                else if (el.type.toUpperCase() == 'RADIO') {
                    this.fillRadio(el, value);
                }
                else {
                    el.value = value;
                }
            }
        });
    }
    fillSelect(el, value, values) {
        const options = [].slice.call(el.options).map((el) => {
            return el.innerHTML.trim();
        });
        let index;
        if (values.length) {
            index = values.reduce((acc, el) => {
                if (acc > -1) {
                    return acc;
                }
                else {
                    return options.indexOf(el);
                }
            }, -1);
        }
        else {
            index = options.indexOf(value);
        }
        console.log(options, value, index, options[index]);
        if (index >= 0) {
            el.selectedIndex = index;
        }
        return el;
    }
    fillCheckbox(el, value) {
    }
    fillRadio(el, value) {
    }
}
exports.BasicFiller = BasicFiller;
