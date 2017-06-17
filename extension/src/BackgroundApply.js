"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackgroundApply = (function () {
    function BackgroundApply() {
        console.log('BackgroundApply');
        chrome.browserAction.onClicked.addListener(this.clickIcon.bind(this));
    }
    BackgroundApply.prototype.clickIcon = function () {
        var _this = this;
        console.log('clickIcon');
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log('tabs', tabs);
            if (tabs.length) {
                chrome.tabs.sendMessage(tabs[0].id, {}, _this.resultOfClick.bind(_this));
            }
        });
    };
    BackgroundApply.prototype.resultOfClick = function (response) {
        console.log('resultOfClick', response);
    };
    return BackgroundApply;
}());
exports.BackgroundApply = BackgroundApply;
