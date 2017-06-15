
export class JSONResume {

	findDeep(path): string {
		let current = this;
		path.split('.').forEach((p) =>{ current = current[p]; });
		return <any>current;
	}

}
