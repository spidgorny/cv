import {BasicFiller} from './BasicFiller';
import {FillerInterface} from "../FillerInterface";

/**
 * @see
 */
export class DaimlerCom extends BasicFiller implements FillerInterface {

	map = {
		'input#HRS_APPL_WRK_HRS_OPRNAME\\$13\\$': 'basics.email',
		'input#HRS_APPL_WRK_HRS_OPRPSWD\\$15\\$': 'basics.password',
		'input#HRS_APPL_WRK_HRS_CONFMPSWD': 'basics.password',

		'input#HRS_APPL_WRK_HRS_OPRNAME': 'basics.email',
		'input#HRS_APPL_WRK_HRS_OPRPSWD': 'basics.password',

		'select#HRS_NAME_WORK_NAME_PREFIX.PSDROPDOWNLIST': 'basics.anrede',
		'select#HRS_NAME_WORK_NAME_TITLE.PSDROPDOWNLIST': 'basics.title',
		'input#HRS_NAME_WORK_FIRST_NAME.PSEDITBOX': 'basics.firstName',
		'input#HRS_NAME_WORK_LAST_NAME.PSEDITBOX': 'basics.lastName',
		'input#HRS_APPLICANT_BIRTHDATE.PSEDITBOX': 'basics.birthDate.us',
		'input#HRS_APPLICANT_BIRTHPLACE.PSEDITBOX': 'basics.birthPlace',
		'select#HRS_APP_NAT_GER_HRS_NATION_CD\\$0.PSDROPDOWNLIST': 'basics.nationality',
		'input#HRS_ADDR_WORK_ADDRESS1.PSEDITBOX': 'basics.location.street',
		'input#HRS_ADDR_WORK_POSTAL.PSEDITBOX': 'basics.location.zip',
		'input#HRS_ADDR_WORK_CITY.PSEDITBOX': 'basics.location.city',
		'select#HRS_ADDR_WORK_COUNTRY.PSDROPDOWNLIST': 'basics.location.country',
		'input#HRS_ADDR_WORK_ADDRESS2.PSEDITBOX': 'basics.location.address2',
		'select#HRS_APPLICANT_DC_GES_VERTRET_CD': 'basics.legalRepresentative',
		'select#HRS_APPLICANT_DC_HRS_APP_PREF_LN.PSDROPDOWNLIST': 'basics.contactLanguage',
		'input#HRS_APP_EMAIL_EMAIL_ADDR\\$0.PSEDITBOX': 'basics.email',
		'input#HRS_APP_PHONE_PHONE\\$0.PSEDITBOX': 'basics.phone',

		'textarea#HRS_RESM_APP_VW_RESUME_TEXT\\$0': 'coverLetter',
	};

	/**
	 * filling with iframes
	 * @param document
	 */
	fill(document: Document) {
		document.querySelectorAll('iframe').forEach( item => {
			let frameDocument = item.contentWindow.document;
			super.fill(frameDocument);
		});
	}

}
