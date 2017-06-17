"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicFiller = (function () {
    function BasicFiller() {
    }
    BasicFiller.prototype.fill = function (document, resume) {
        var _this = this;
        Object.keys(this.map).forEach(function (selector) {
            var path = _this.map[selector];
            var value = resume.findDeep(path);
            var el = document.querySelector(selector);
            if (el) {
                if (el.tagName.toUpperCase() == 'SELECT') {
                    el.selectedIndex = value;
                }
                else {
                    el.value = value;
                }
            }
        });
    };
    return BasicFiller;
}());
exports.BasicFiller = BasicFiller;
