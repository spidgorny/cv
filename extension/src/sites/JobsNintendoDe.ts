import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

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
	}

}
