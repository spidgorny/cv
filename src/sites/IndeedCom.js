"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicFiller_1 = require("./BasicFiller");
/**
 * @see https://de.indeed.com/viewjob?jk=1f37eef6ca8b860f&q=php&tk=1birctct992sgddm&from=web
 * @problem with iframes from other domain apply.indeed.com
 */
class IndeedCom extends BasicFiller_1.BasicFiller {
    constructor() {
        super(...arguments);
        this.map = {
            'input#applicant.name': 'basics.name',
            'input#applicant.email': 'basics.email',
            'input#applicant.phoneNumber': 'basics.phone',
        };
    }
}
exports.IndeedCom = IndeedCom;
