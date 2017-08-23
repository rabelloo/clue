import * as localforage from 'localforage';

export class LocalForageTable {

    constructor(name: string) { 
        this.instance = localforage.createInstance({
            name: name
        });
    }

    instance: LocalForage
}
