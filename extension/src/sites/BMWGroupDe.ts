import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

/**
 * @see
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
	};

}
