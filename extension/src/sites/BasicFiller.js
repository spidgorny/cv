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
        // values.reduce((acc, el) => {
        // 	if (acc > -1) {
        // 	let index = options.indexOf(valueItem);
        // }, -1);
        let index = options.indexOf(value);
        console.log(options, value, index);
        if (index >= 0) {
            el.selectedIndex = index;
        }
        return el;
    }
}
exports.BasicFiller = BasicFiller;
