import {FillerInterface} from "../FillerInterface";
import {JSONResume} from "./JSONResume";

export class BasicFiller implements FillerInterface {

	map: object;

	fill(document: Document, resume: JSONResume) {
		Object.keys(this.map).forEach((selector: string) => {
			const path = this.map[selector];
			const value = resume.findDeep(path);
			const el: HTMLInputElement|HTMLSelectElement = <any>document.querySelector(selector);
			if (el.tagName.toUpperCase() == 'SELECT') {
				el.selectedIndex = value;
			} else {
				el.value = value;
			}
		});
	}

}

