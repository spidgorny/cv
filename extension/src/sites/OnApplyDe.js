"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BasicFiller_1 = require("./BasicFiller");
var OnApplyDe = (function (_super) {
    __extends(OnApplyDe, _super);
    function OnApplyDe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = {
            'input#applicationform-firstname': 'basics.firstName'
        };
        return _this;
    }
    return OnApplyDe;
}(BasicFiller_1.BasicFiller));
exports.OnApplyDe = OnApplyDe;
