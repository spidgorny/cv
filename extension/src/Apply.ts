// import {FieldConfig} from './FieldConfig';

const FieldConfig = require('./FieldConfig').FieldConfig;
import {IndeedCom} from "./sites/IndeedCom";
import {FillerInterface} from './FillerInterface';
import {JSONResume} from "./JSONResume";
import {OnApplyDe} from "./sites/OnApplyDe";
import {BMWGroupDe} from "./sites/BMWGroupDe";
import {JobsNintendoDe} from "./sites/JobsNintendoDe";
import {DaimlerCom} from "./sites/DaimlerCom";

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
		}

		this.resume = new JSONResume(require('./../fixture/thomasdavis.json'));
		// console.log(this.resume);
	}

	checkForm() {
		const selectors = this.getSelectorsFromFrames();
		if (selectors) {
			const json = this.zip(selectors, [], '');
			console.log(JSON.stringify(json, null, 4));
		} else {
			console.log('no forms on this page');
		}
	}

	getSelectorsFromFrames() {
		let allSelectors = [];
		this.document.querySelectorAll('iframe').forEach( item => {
			let frameDocument = item.contentWindow.document;
			console.log(frameDocument.querySelectorAll('input'));
			let df = new DocumentFields(frameDocument);
			allSelectors.push({
				iframe: item,
				selectors: df.getSelectors(),
			});
		});
	}

	messageHandler(request, sender, sendResponse) {
		// console.log(sender.tab ?
		// 	"from a content script:" + sender.tab.url :
		// 	"from the extension");

		this.clickIcon(request);

		sendResponse({});
	}

	clickIcon(request) {
		console.log('request', request);
		const selectors = this.getSelectors();
		const values = selectors.map(selector => {
			const el = this.$(selector);
			return el.selectedIndex ? el.options[el.value].value : el.value;
		});
		const zip = this.zip(selectors, values);
		console.log(zip);

		const filler = this.getFiller(document.location.host);
		console.log(filler);
		if (filler) {
			filler.fill(document);
		} else {
			console.log("we don't know how to fill ", document.location.host);
		}
	}

	public zip(selectors: string[], values: any[], defaultV = undefined) {
		const zip = {};
		selectors.forEach((key, idx) => zip[key] = idx in values ? values[idx] : defaultV);
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

}
