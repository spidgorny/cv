
export class JSONResume {

	constructor(props: any) {
		Object.assign(this, props);
	}

	findDeep(path): string {
		let current = this;
		path.split('.').forEach((p) =>{ current = current[p]; });
		return <any>current;
	}

}
