import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

/**
 * @see
 */
export class DaimlerCom extends BasicFiller implements FillerInterface {

	map = {
		'input#HRS_APPL_WRK_HRS_OPRNAME$13$': 'basics.username',
		'input#HRS_APPL_WRK_HRS_OPRPSWD$15$': 'basics.password',
		'input#HRS_APPL_WRK_HRS_CONFMPSWD': 'basics.password',
	}

}
