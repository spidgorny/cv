"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicFiller_1 = require("./BasicFiller");
/**
 * @see
 */
class BMWGroupDe extends BasicFiller_1.BasicFiller {
    constructor() {
        super(...arguments);
        this.map = {
            "select#anredeid": "basics.anrede",
            "input#vorname": "basics.firstName",
            "input#nachname": "basics.lastName",
            "input#benutzername": "basics.username",
            "input#passwort": "basics.password",
            "input#passwortwiederholung": "basics.password",
            "input#email": "basics.email",
            "input#emailwiederholung": "basics.email",
        };
    }
}
exports.BMWGroupDe = BMWGroupDe;
