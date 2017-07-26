
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

		chrome.contextMenus.create({
			id: 'saveJob',
			contexts: [
				"browser_action",
			],
			title: "Save This Job",
		});
		chrome.contextMenus.onClicked.addListener(this.menuItemClickDispatch.bind(this));
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

	menuItemClickDispatch(event) {
		console.log(event.menuItemId);
		if (this[event.menuItemId]) {
			this[event.menuItemId]();
		}
	}

	/**
	 * Menu item
	 */
	showSelectors() {
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

	/**
	 * Menu item
	 */
	saveJob() {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			console.log('tabs', tabs);
			if (tabs.length) {
				console.log(tabs[0]);
				let newURL = 'http://localhost/slawa/dev-jobz/htdocs/SaveJob?link=' + encodeURIComponent(tabs[0].url);
				chrome.tabs.create({url: newURL});
			}
		});
	}

}
