export class BasicFiller {
    fill(document, resume) {
        Object.keys(this.map).forEach((selector) => {
            const path = this.map[selector];
            const value = resume.findDeep(path);
            const el = document.querySelector(selector);
            if (el.tagName.toUpperCase() == 'SELECT') {
                el.selectedIndex = value;
            }
            else {
                el.value = value;
            }
        });
    }
}
