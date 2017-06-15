import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

export default class OnApplyDe extends BasicFiller implements FillerInterface {

	map = {
		'input#applicationform-firstname': 'basics.firstName'
	}

}
