export class JSONResume {
    findDeep(path) {
        let current = this;
        path.split('.').forEach((p) => { current = current[p]; });
        return current;
    }
}
