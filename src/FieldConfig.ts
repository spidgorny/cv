
export class FieldConfig {

	selector: string;

	tagName: string;

	type: string;

	class: string;

	id: string;

	labels: string[];

	name: string;

	constructor(props: object) {
		Object.assign(this, props);
	}

}
