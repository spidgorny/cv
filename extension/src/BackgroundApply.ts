
export class BackgroundApply {

	constructor() {
		console.log('BackgroundApply');
		// chrome.runtime.onInstalled.addListener(this.init.bind(this));
		this.init();
	}

	init() {
		console.log('init');
		chrome.browserAction.onClicked.addListener(this.clickIcon.bind(this));
		chrome.contextMenus.create({
			id: 'showSelectors',
			contexts: [
				// "all",
				// "page",
				// "frame",
				// "selection",
				// "link",
				// "editable",
				// "image",
				// "video",
				// "audio",
				// "launcher",
				"browser_action",
				// "page_action"
			],
			title: "Show Selectors",
			//onclick: this.menuItemShowSelectors.bind(this)
		});
		chrome.contextMenus.onClicked.addListener(this.menuItemShowSelectors.bind(this));
	}

	clickIcon() {
		console.log('clickIcon');
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			console.log('tabs', tabs);
			if (tabs.length) {
				chrome.tabs.sendMessage(tabs[0].id, {
					action: 'clickIcon'
				}, this.resultOfClick.bind(this));
			}
		});
	}


	resultOfClick(response) {
		console.log('resultOfClick', response);
	}

	menuItemShowSelectors() {
		console.log('menuItemShowSelectors');
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			console.log('tabs', tabs);
			if (tabs.length) {
				chrome.tabs.sendMessage(tabs[0].id, {
					action: 'showSelectors'
				}, this.resultOfClick.bind(this));
			}
		});
	}

}
