import {FillerInterface} from "../FillerInterface";
import {JSONResume} from "../JSONResume";

export class BasicFiller implements FillerInterface {

	map: object;

	resume: JSONResume;

	constructor(resume: JSONResume) {
		this.resume = resume;
	}

	fill(document: Document) {
		Object.keys(this.map).forEach((selector: string) => {
			const path = this.map[selector];
			const value = this.resume.findDeep(path);
			console.log(selector, path, value);
			const el: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement = <any>document.querySelector(selector);
			if (el) {
				if (el.tagName.toUpperCase() == 'SELECT') {
					this.fillSelect(<HTMLSelectElement>el,
						value,
						Array.isArray(value) ? value : [value]
					);
				} else if (el.tagName.toUpperCase() == 'TEXTAREA') {
					this.fillTextarea(<HTMLTextAreaElement>el, value);
				} else if (el.type.toUpperCase() == 'CHECKBOX') {
					this.fillCheckbox(<HTMLInputElement>el, value);
				} else if (el.type.toUpperCase() == 'RADIO') {
					this.fillRadio(<HTMLInputElement>el, value);
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
		if (values && values.length) {
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

	fillTextarea(el: HTMLTextAreaElement, value) {
		el.innerHTML = value;
	}

	fillCheckbox(el: HTMLInputElement, value) {
		el.checked = value;
	}

	fillRadio(el: HTMLInputElement, value) {
		const name = el.name;
		let sameName = document.getElementsByName(name);
		sameName = [].slice.call(sameName);
		console.log(name, sameName, value);
		const aValue = Array.isArray(value) ? value : [value];
		sameName.forEach((el: HTMLInputElement) => {
			if (-1 < aValue.indexOf(el.value.trim())) {
				el.checked = true;
			}
		});
	}

}

