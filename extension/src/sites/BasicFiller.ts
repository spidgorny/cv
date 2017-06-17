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
				} else {
					el.value = value;
				}
			}
		});
	}

	fillSelect(el: HTMLSelectElement, value: string, values: string[]) {
		const options = [].slice.call(el.options).map((el: HTMLOptionElement) => {
			return el.innerHTML.trim();
		});

		// values.reduce((acc, el) => {
		// 	if (acc > -1) {
		// 	let index = options.indexOf(valueItem);
		// }, -1);

		let index = options.indexOf(value);
		console.log(options, value, index);
		if (index >= 0) {
			el.selectedIndex = index;
		}
		return el;
	}

}

