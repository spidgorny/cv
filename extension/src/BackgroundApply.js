"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BackgroundApply {
    constructor() {
        console.log('BackgroundApply');
        chrome.browserAction.onClicked.addListener(this.clickIcon.bind(this));
    }
    clickIcon() {
        console.log('clickIcon');
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log('tabs', tabs);
            if (tabs.length) {
                chrome.tabs.sendMessage(tabs[0].id, {}, this.resultOfClick.bind(this));
            }
        });
    }
    resultOfClick(response) {
        console.log('resultOfClick', response);
    }
}
exports.BackgroundApply = BackgroundApply;
