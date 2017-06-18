
export declare class JSONResumeLocation {
	street: string;
	zip: string;
	city: string;
	countryCode: string;
	country: string;
}

export declare class JSONResumeBasics {
	anrede: Array<string>;
	title: Array<string>;
	firstName: string;
	lastName: string;
	name: string;
	label: string;
	summary: string;
	email: string;
	website: string;
	phone: string;
	phone2: string;
	fax: string;
	username: string;
	password: string;
	preferredContact: Array<string>;
	location: JSONResumeLocation;
/*	"profiles": [
		{
			"username": "ajaxdavis",
			"url": "https://twitter.com/ajaxdavis",
			"network": "twitter"
		},
		{
			"url": "https://github.com/thomasdavis",
			"username": "thomasdavis",
			"network": "github"
		}
	]
*/}

export declare class JSONResumeEducation {
	type: string;
	endDate: string;
	startDate: string;
	area: string;
	studyType: string;
	institution: string;
	degree: string;
}

export class JSONResume {

	basics: JSONResumeBasics;

	coverLetter: string;

	education: Array<JSONResumeEducation>;

	/**
	 * optional, @see JobsNintendoDe
	 */
	educationByType: Map<string, JSONResumeEducation>;

	constructor(props: any) {
		Object.assign(this, props);
	}

	findDeep(path): string {
		let current = this;
		path.split('.').forEach((p) =>{ current = current[p]; });
		return <any>current;
	}

}
