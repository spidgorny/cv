import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

/**
 * @see https://de.indeed.com/viewjob?jk=1f37eef6ca8b860f&q=php&tk=1birctct992sgddm&from=web
 */
export class BMWGroupDe extends BasicFiller implements FillerInterface {

	map = {
		"select#anredeid": "basics.anrede",
		"input#vorname": "basics.firstName",
		"input#nachname": "basics.lastName",
		"input#benutzername": "basics.username",
		"input#passwort": "basics.password",
		"input#passwortwiederholung": "basics.password",
		"input#email": "basics.email",
		"input#emailwiederholung": "basics.email",
	}

}
