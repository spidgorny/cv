import {IndeedCom} from "./sites/IndeedCom";
import {FillerInterface} from './FillerInterface';
import {JSONResume} from "./JSONResume";
import {OnApplyDe} from "./sites/OnApplyDe";
import {BMWGroupDe} from "./sites/BMWGroupDe";
import {JobsNintendoDe} from "./sites/JobsNintendoDe";
import {DaimlerCom} from "./sites/DaimlerCom";
import {DocumentFields} from "./DocumentFields";
import {TaleoNet} from "./sites/TaleoNet";
import {GoogleCom} from "./sites/GoogleCom";
import {isNull} from "util";
import {VolkswagenDe} from "./sites/VolkswagenDe";

// const isBrowser = this.window === this;
const isBrowser = typeof window == 'object' && window.toString() == "[object Window]";

export class Apply {

	document: Document;

	$: Function;

	$$: Function;

	resume: JSONResume;

	fillerMap = {
		'onapply.de': OnApplyDe,
		'indeed.com': IndeedCom,
		'bmwgroup.de': BMWGroupDe,
		'jobs.nintendo.de': JobsNintendoDe,
		'daimler.com': DaimlerCom,
		'taleo.net': TaleoNet,
		'google.com': GoogleCom,
		'volkswagen.de': VolkswagenDe,
	};

	constructor(document) {
		this.document = document;
		this.$ = this.document.querySelector.bind(this.document);
		this.$$ = selector => {
			// https://davidwalsh.name/nodelist-array
			const list = this.document.querySelectorAll(selector);
			return [].slice.call(list);
		};

		if (isBrowser) {
			chrome.runtime.onMessage.addListener(this.messageHandler.bind(this));
			document.defaultView['apply'] = this;
			document['apply'] = this;
		}

		this.resume = new JSONResume(require('./../fixture/thomasdavis.json'));
		// console.log(this.resume);
	}

	checkForm() {
		const selectors = this.getSelectors();
		if (selectors) {
			console.log('selectors', selectors.length);
			const json = this.zipMap(selectors, (selector) => {
				try {
					return this.$(selector);
				} catch (e) {
					if (e instanceof DOMException) {
					} else {
						throw e;
					}
				}
			}, '');
			console.log(json);
			//console.log(JSON.stringify(json, null, 4));
		} else {
			console.log('no forms on this page');
		}
	}

	getSelectorsFromFrames() {
		let allSelectors = [];
		let allFrames = [];
		allFrames = this.$$('iframe').map((item) => {
			let doc = null;
			// Error in event handler for runtime.onMessage: SecurityError: Blocked a frame with origin
			try {
				doc = item.contentWindow.document;
			} catch (e) {
				// ignore
			}
			return doc;
		});
		allFrames = allFrames.filter(el => {
			return !isNull(el);	// remove empty due to the
		});
		allFrames.unshift(this.document);	// if there are no iframes
		console.log('frames', allFrames.length);
		allFrames.forEach(frameDocument => {
			//console.log('frameDocument->input', frameDocument.querySelectorAll('input'));
			let df = new DocumentFields(frameDocument);
			allSelectors.push({
				df: df,
				iframe: frameDocument,
				selectors: df.getSelectors(),
			});
		});
		return allSelectors;
	}

	getSelectors() {
		const allSelectors = this.getSelectorsFromFrames();
		console.log('allSelectors', allSelectors.length);
		let merged = [];
		allSelectors.forEach((el, idx) => {
			if (!el.selectors.length) {	// executed too early before AJAX loaded <form>
				el.selectors = el.df.getSelectors();
			}
			console.log(el.iframe, el.selectors);
			console.log('frame', idx, 'concat', el.selectors.length);
			merged = merged.concat(el.selectors);
			console.log('merged', merged.length);
		});
		return merged;
	}

	messageHandler(request, sender, sendResponse) {
		// console.log(sender.tab ?
		// 	"from a content script:" + sender.tab.url :
		// 	"from the extension");

		switch(request.action) {
			case 'clickIcon':
				this.clickIcon(request, sendResponse);
				break;
			case 'showSelectors':
				this.showSelectors(request, sendResponse);
				break;
		}
	}

	clickIcon(request: any, done: Function) {
		console.log('request', request);
		const selectors = this.getSelectors();
		// this.dumpSelectorValues(selectors);
		const filler = this.getFiller(document.location.host);
		console.log(filler);
		if (filler) {
			filler.fill(document);
		} else {
			console.log("we don't know how to fill ", document.location.host);
		}
		done();
	}

	dumpSelectorValues(selectors: string[]) {
		const values = selectors.map(selector => {
			try {
				const el = this.$(selector);
				if (el) {
					if ('selectedIndex' in el) {
						let option = el.options[el.selectedIndex];
						if (option) {
							return option.value;
						}
					} else {
						return el.value;
					}
				}
			} catch (e) {
				if (e instanceof DOMException) {
				} else {
					throw e;
				}
			}
		});
		const zip = this.zip(selectors, values);
		console.log(zip);
	}

	public zip(selectors: string[], values: any[]|Function, defaultV = undefined) {
		const zip = {};
		selectors.forEach((key, idx) => {
			if (typeof values == 'function') {
				zip[key] = values(key, idx);
			} else {
				zip[key] = idx in values ? values[idx] : defaultV;
			}
		});
		return zip;
	}

	public zipMap(selectors: string[], values: any[]|Function, defaultV = undefined) {
		const zip = new Map();
		selectors.forEach((key, idx) => {
			if (typeof values == 'function') {
				zip[key] = values(key, idx);
			} else {
				zip[key] = idx in values ? values[idx] : defaultV;
			}
		});
		return zip;
	}

	getFiller(host: string): FillerInterface {
		let filler;
		const one = Object.keys(this.fillerMap).filter((domain: string) => {
			return host.endsWith(domain);
		});
		if (one.length) {
			const className = this.fillerMap[one[0]];	// onapply.de => OnApplyDe

			//filler = require('./sites/' + className);
			//filler = filler[className];

			//filler = new this[className]();

			// filler = Object.create(className);

			filler = new className(this.resume);
		}
		return filler;
	}

	showSelectors(request, done: Function) {
		const selectors = this.getSelectors();
		selectors.map(selector => {
			try {
				const el = this.$(selector);
				if (el && !el.value) {
					el.value = selector;
					if (el instanceof HTMLSelectElement) {
						const optionName = document.createElement('option');
						optionName.innerHTML = selector;
						el.options.add(optionName);
						el.selectedIndex = el.options.length - 1;
					}
				}
			} catch (e) {
				if (e instanceof DOMException) {
				} else {
					throw e;
				}
			}
		});
		done();
	}

}
