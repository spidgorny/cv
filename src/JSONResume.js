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
    setEducationByType() {
        let educationByType = new Map();
        this.education.forEach((edu) => {
            let type = edu.type;
            educationByType[type] = edu;
        });
        console.log(educationByType);
        this.educationByType = educationByType;
    }
}
exports.JSONResume = JSONResume;
