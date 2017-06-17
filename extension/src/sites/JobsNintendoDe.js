"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicFiller_1 = require("./BasicFiller");
/**
 * @see https://jobs.nintendo.de/main?fn=bm.ext.jobsform&refnr=2341288&land=DE
 */
class JobsNintendoDe extends BasicFiller_1.BasicFiller {
    constructor() {
        super(...arguments);
        this.map = {
            "input[name=\"anschreib\"]": "coverLetter",
            "select[name=\"kontakt\"]": "basics.preferredContact",
            "input[name=\"geschl\"]": "basics.anrede",
            "select[name=\"titel\"]": "basics.title",
            "input[name=\"vname\"]": "basics.firstName",
            "input[name=\"name\"]": "basics.lastName",
            "input[name=\"ansch\"]": "basics.location.street",
            "input[name=\"anschplz\"]": "basics.location.zip",
            "input[name=\"anschort\"]": "basics.location.city",
            "select[name=\"anschland\"]": "basics.location.country",
            "input[name=\"telefon1\"]": "basics.location.phone",
            "input[name=\"telefon2\"]": "basics.location.phone2",
            "input[name=\"telefax\"]": "basics.location.fax",
            "input[name=\"email\"]": "basics.location.email",
        };
    }
}
exports.JobsNintendoDe = JobsNintendoDe;