import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

/**
 * @see https://de.indeed.com/viewjob?jk=1f37eef6ca8b860f&q=php&tk=1birctct992sgddm&from=web
 * @problem with iframes from other domain apply.indeed.com
 */
export class IndeedCom extends BasicFiller implements FillerInterface {

	map = {
		'input#applicant.name': 'basics.name',
		'input#applicant.email': 'basics.email',
		'input#applicant.phoneNumber': 'basics.phone',
	};

}
