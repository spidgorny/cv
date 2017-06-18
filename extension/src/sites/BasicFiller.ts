import {FillerInterface} from "../FillerInterface";
import {JSONResume} from "../JSONResume";

export class BasicFiller implements FillerInterface {

	map: object;

	fill(document: Document, resume: JSONResume) {
		Object.keys(this.map).forEach((selector: string) => {
			const path = this.map[selector];
			const value = resume.findDeep(path);
			console.log(selector, path, value);
			const el: HTMLInputElement|HTMLSelectElement = <any>document.querySelector(selector);
			if (el) {
				if (el.tagName.toUpperCase() == 'SELECT') {
					this.fillSelect(<HTMLSelectElement>el,
						value,
						Array.isArray(value) ? value : [value]
					);
				} else if (el.type.toUpperCase() == 'CHECKBOX') {
					this.fillCheckbox(el, value);
				} else if (el.type.toUpperCase() == 'RADIO') {
					this.fillRadio(el, value);
				} else {
					el.value = value;
				}
			}
		});
	}

	fillSelect(el: HTMLSelectElement, value: string, values?: string[]) {
		const options = [].slice.call(el.options).map((el: HTMLOptionElement) => {
			return el.innerHTML.trim();
		});

		let index;
		if (values.length) {
			index = values.reduce((acc, el) => {
				if (acc > -1) {
					return acc;
				} else {
					return options.indexOf(el);
				}
			}, -1);
		} else {
			index = options.indexOf(value);
		}
		console.log(options, value, index, options[index]);
		if (index >= 0) {
			el.selectedIndex = index;
		}
		return el;
	}

	fillCheckbox(el, value) {

	}

	fillRadio(el, value) {

	}

}

