// Simple memory store for agent interactions
export class Memory {
    constructor() {
        this.storeData = {};
    }

    store(key, value) {
        this.storeData[key] = value;
        console.log(`Memory stored: ${key} -> ${value}`);
    }

    get(key) {
        return this.storeData[key];
    }
}
