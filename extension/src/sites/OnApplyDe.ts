import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

export class OnApplyDe extends BasicFiller implements FillerInterface {

	map = {
		'input#applicationform-firstname': 'basics.firstName'
	}

}
