import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";
import {JSONResume} from "../JSONResume";

/**
 * @see https://chj.tbe.taleo.net/chj05/ats/careers/apply.jsp?rid=47925&org=TESLA&cws=1&parsingId=TASKTESLA:1163242737:1497820102189&parsingToken=ef1a12e80bb18b79f1e359e96b447e9c1baf2660&emplProfileImported=true
 */
export class TaleoNet extends BasicFiller implements FillerInterface {

	map = {
		"input#email": 'basics.email',
		"input#cwsPassword": 'basics.password',
		"input#cwsPassword_2": 'basics.password',
		"input#firstName": 'basics.firstName',
		"input#lastName": 'basics.lastName',
		"input#phone": 'basics.phone',
		"input#cellPhone": 'basics.phone2',

		'input#country': 'basics.location.country',
		'input#address': 'basics.location.street',
		'input#secondaryAddress': 'basics.location.address2',
		'input#city': 'basics.location.city',
		'input[name="CUSTOM_1372"]': 'basics.location.region',
		'input#zipCode': 'basics.location.zip',

		'input[name="jobTitle_1"]': 'work.0.position',
		'input[workDateFrom_1]': 'work.0.startMonthSlashYear',
		'input[workDateTo_1]': 'work.0.endMonthSlashYear',
		'input[name="companyName_1"]': 'work.0.company',

		'input[name="jobTitle_2"]': 'work.1.position',
		'input[workDateFrom_2]': 'work.1.startMonthSlashYear',
		'input[workDateTo_2]': 'work.1.endMonthSlashYear',
		'input[name="companyName_2"]': 'work.1.company',

		'textarea#__id_txt_resumeText': 'coverLetter',
	};

	constructor(resume: JSONResume) {
		super(resume);
		resume.work.forEach((work) => {
			let startDate = new Date(work.startDate);
			work['startMonthSlashYear'] = (1+startDate.getMonth()) + '/' + startDate.getFullYear();
			if ('endDate' in work) {
				let endDate = new Date(work.endDate);
				work['endMonthSlashYear'] = (1+endDate.getMonth()) + '/' + endDate.getFullYear();
			}
			// console.log(work);
		});
	}
}
