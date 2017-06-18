import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";
import {JSONResume, JSONResumeEducation} from "../JSONResume";

/**
 * @see https://jobs.nintendo.de/main?fn=bm.ext.jobsform&refnr=2341288&land=DE
 */
export class JobsNintendoDe extends BasicFiller implements FillerInterface {

	map = {
		"input[name=\"bem\"]": "coverLetter",
		"select[name=\"kontakt\"]": "basics.preferredContact",
		"input[name=\"geschl\"]": "basics.anrede",
		"select[name=\"titel\"]": "basics.title",
		"input[name=\"vname\"]": "basics.firstName",
		"input[name=\"name\"]": "basics.lastName",

		"input[name=\"ansch\"]": "basics.location.street",
		"input[name=\"anschplz\"]": "basics.location.zip",
		"input[name=\"anschort\"]": "basics.location.city",
		"select[name=\"anschland\"]": "basics.location.country",
		"input[name=\"telefon1\"]": "basics.phone",
		"input[name=\"telefon2\"]": "basics.phone2",
		"input[name=\"telefax\"]": "basics.fax",
		"input[name=\"email\"]": "basics.email",

		"select[name=\"schule\"]": 		"educationByType.school.studyType",
		"input[name=\"schule1\"]": 		"educationByType.school.studyType",
		"select[name=\"abschl\"]": 		"educationByType.school.degree",
		"input[name=\"abschl1\"]": 		"educationByType.school.degree",
		"textarea[name=\"zinfo\"]": 	"educationByType.school.institution",

		"input[name=\"ausb1\"]": 		"educationByType.apprenticeship1.studyType",
		"input[name=\"firma1\"]": 		"educationByType.apprenticeship1.institution",
		"input[name=\"fachricht1\"]": 	"educationByType.apprenticeship1.area",
		"input[name=\"anschort1\"]": 	"educationByType.apprenticeship1.location",
		"textarea[name=\"zinfo1\"]": 	"educationByType.apprenticeship1.comment",

		"input[name=\"ausb2\"]": 		"educationByType.apprenticeship2.studyType",
		"input[name=\"firma2\"]": 		"educationByType.apprenticeship2.institution",
		"input[name=\"fachricht2\"]": 	"educationByType.apprenticeship2.area",
		"input[name=\"anschort2\"]": 	"educationByType.apprenticeship2.location",
		"textarea[name=\"zinfo2\"]": 	"educationByType.apprenticeship2.comment",
	};

	constructor(resume: JSONResume) {
		super(resume);
		let educationByType = new Map();
		this.resume.education.forEach((edu) => {
			let type = edu.type;
			educationByType[type] = edu;
		});
		console.log(educationByType);
		this.resume.educationByType = educationByType;
	}

}
