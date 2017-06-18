"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicFiller_1 = require("./BasicFiller");
/**
 * @see
 */
class DaimlerCom extends BasicFiller_1.BasicFiller {
    constructor() {
        super(...arguments);
        this.map = {
            'input#HRS_APPL_WRK_HRS_OPRNAME$13$': 'basics.username',
            'input#HRS_APPL_WRK_HRS_OPRPSWD$15$': 'basics.password',
            'input#HRS_APPL_WRK_HRS_CONFMPSWD': 'basics.password',
        };
    }
}
exports.DaimlerCom = DaimlerCom;
