"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JSONResume {
    constructor(props) {
        Object.assign(this, props);
    }
    findDeep(path) {
        let current = this;
        path.split('.').forEach((p) => { current = current[p]; });
        return current;
    }
}
exports.JSONResume = JSONResume;
