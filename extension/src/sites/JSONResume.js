"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSONResume = (function () {
    function JSONResume(props) {
        Object.assign(this, props);
    }
    JSONResume.prototype.findDeep = function (path) {
        var current = this;
        path.split('.').forEach(function (p) { current = current[p]; });
        return current;
    };
    return JSONResume;
}());
exports.JSONResume = JSONResume;
