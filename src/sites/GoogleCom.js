"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicFiller_1 = require("./BasicFiller");
/**
 * @see https://www.google.com/about/careers/applications/u/1/packets/d12dae4f-27d3-4a9b-9c2b-b7f52723c739/form
 */
class GoogleCom extends BasicFiller_1.BasicFiller {
    constructor(resume) {
        super(resume);
        this.map = {
            'input[name="legalName"]': 'basics.name',
            'textarea#input_2': 'basics.location.street',
            'select[name="contactInfoCountry"]': 'basics.location.country',
            'input[name="contactInfoCity"]': 'basics.location.city',
            'input#input_268': 'basics.location.region',
            'input#input_6': 'basics.location.zip',
            'input#phone-0': 'basics.phone',
            'input#input_7': 'basics.website',
            'input#school-name-0': 'educationByType.education1.institution',
            'input[name="degreeMajor0"]': 'educationByType.education1.area',
        };
        this.delay = 500;
        /**
         * counter for setTimeout
         * @type {number}
         */
        this.i = 0;
        this.resume.setEducationByType();
    }
    fill(document) {
        super.fill(document);
        // angular requires to click each fake element to update value
        Object.keys(this.map).forEach((selector) => {
            setTimeout(() => {
                const el = document.querySelector(selector);
                if (el) {
                    console.log('clicking on', el);
                    el.focus();
                    el.click();
                }
            }, this.delay * this.i++);
        });
        setTimeout(this.setCountry.bind(this, document), this.delay * this.i++);
        let studyType = this.resume.findDeep('educationByType.education1.studyType');
        setTimeout(this.setSelector.bind(this, document, 'select_833', studyType), this.delay * this.i++);
        setTimeout(this.setSelector.bind(this, document, 'degree-status-0', 'Graduated'), this.delay * this.i++);
        let studyCountry = this.resume.findDeep('educationByType.education1.country');
        console.log('studyCountry', studyCountry);
        setTimeout(this.setSelector.bind(this, document, 'select_277', studyCountry), this.delay * this.i++);
    }
    setCountry(document) {
        let userCountryCode = this.resume.findDeep('basics.location.countryCode');
        let country = document.querySelector('md-select#select_3');
        if (country) {
            console.log('country', country);
            country.focus();
            country.click();
            setTimeout(() => {
                let validOptionSelector = 'div.md-select-menu-container.md-active md-option[value="' + userCountryCode + '"]';
                // query document as this is a floating div outside of <md-select>
                let validOption = document.querySelector(validOptionSelector);
                console.log(validOptionSelector, validOption);
                if (validOption) {
                    validOption.focus();
                    validOption.click();
                }
            }, 1);
        }
    }
    setSelector(document, id, value) {
        let selector = document.querySelector('md-select#' + id);
        if (selector) {
            console.log('selector', selector);
            selector.focus();
            selector.click();
            setTimeout(() => {
                let optionSelector = 'div.md-select-menu-container.md-active md-option div.md-text';
                // query document as this is a floating div outside of <md-select>
                let options = document.querySelectorAll(optionSelector);
                console.log(optionSelector, options.length);
                let aOptions = [].slice.call(options);
                aOptions.forEach((div) => {
                    let innerText = div.innerHTML.trim();
                    console.log(innerText);
                    if (innerText == value) {
                        div.focus();
                        div.click();
                    }
                });
            }, 1);
        }
    }
}
exports.GoogleCom = GoogleCom;
