import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

/**
 * @see https://onapply.onapply.de/bewerbung/2620/On-apply-GmbH-Web-Developer-%28m-f%29-Frankfurt-am-Main--Deutschland.html
 */
export class OnApplyDe extends BasicFiller implements FillerInterface {

	map = {
		'select#applicationform-title': 'basics.title',
		'input#applicationform-firstname': 'basics.firstName',
		'input#applicationform-lastname': 'basics.lastName',
		'input#applicationform-email': 'basics.email',
		'input#applicationform-phonenumber': 'basics.phone',
	}

}
