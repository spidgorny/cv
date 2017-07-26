"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicFiller_1 = require("./BasicFiller");
/**
 * @see https://onapply.onapply.de/bewerbung/2620/On-apply-GmbH-Web-Developer-%28m-f%29-Frankfurt-am-Main--Deutschland.html
 */
class OnApplyDe extends BasicFiller_1.BasicFiller {
    constructor() {
        super(...arguments);
        this.map = {
            'select#applicationform-title': 'basics.title',
            'input#applicationform-firstname': 'basics.firstName',
            'input#applicationform-lastname': 'basics.lastName',
            'input#applicationform-email': 'basics.email',
            'input#applicationform-phonenumber': 'basics.phone',
        };
    }
}
exports.OnApplyDe = OnApplyDe;
