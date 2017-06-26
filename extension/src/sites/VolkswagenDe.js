"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicFiller_1 = require("./BasicFiller");
/**
 * @see https://www.google.com/about/careers/applications/u/1/packets/d12dae4f-27d3-4a9b-9c2b-b7f52723c739/form
 */
class VolkswagenDe extends BasicFiller_1.BasicFiller {
    constructor(resume) {
        super(resume);
        this.map = {
            'select[name="salutationId"]': 'basics.anrede',
            'input[name="firstName"]': 'basics.firstName',
            'input[name="lastName"]': 'basics.lastName',
            'input[name="email"]': 'basics.email',
            // 'input[name="alias"]': 'basics.username',
            'input#REGISTER--registerUsername': 'basics.username',
            'input#REGISTER--registerPassword': 'basics.password',
            'input#REGISTER--registerCheck': 'basics.password',
            'select[name="zBirthdayDay"]': 'basics.birthDate.day',
            'select[name="zBirthdayMonth"]': 'basics.birthDate.month',
            'select[name="zBirthdayYear"]': 'basics.birthDate.year',
            'select[name="zDisability"]': 'basics.disability',
            'select[name="zNationality"]': 'basics.nationality',
            'input[name="homePhone"]': 'basics.phone',
            'input[name="mobilePhone"]': 'basics.phone2',
            'input[name="address1"]': 'basics.location.street',
            'input[name="address2"]': 'basics.location.address2',
            'input[name="postalCode"]': 'basics.location.zip',
            'input[name="city"]': 'basics.location.city',
            'select[name="countryId"]': 'basics.location.country',
            'select[name="startMonth"]': 'work.0.startMonth',
            'select[name="startYear"]': 'work.0.startYear',
            'select[name="endMonth"]': 'work.0.endMonth',
            'select[name="endYear"]': 'work.0.endYear',
            'textarea[name="description"]': 'work.0.summary',
            'input[name="jobTitle"]': 'work.0.position',
            'input[name="employer"]': 'work.0.company',
            '.work input[name="city"]': 'work.0.city',
            '.work input[name="country"]': 'work.0.country',
        };
        //this.resume.setEducationByType();
    }
    fill(document) {
        super.fill(document);
        const checkBox = document.querySelector('div.policyBtn div.leftIcon.checkBox.removeFocusBorder');
        if (checkBox) {
            checkBox.className += ' isChecked';
        }
    }
}
exports.VolkswagenDe = VolkswagenDe;
