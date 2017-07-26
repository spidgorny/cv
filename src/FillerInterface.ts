import {JSONResume} from "./JSONResume";

export interface FillerInterface {

	constructor(resume: JSONResume);

	fill(document: Document);

}
