import { BasicFiller } from './BasicFiller';
export default class OnApplyDe extends BasicFiller {
    constructor() {
        super(...arguments);
        this.map = {
            'input#applicationform-firstname': 'basics.firstName'
        };
    }
}
