const dataFile = fetch(new Request('../../data/data.json')).then((response) => {
    return response.json();
})
const tagFile = fetch(new Request('../../data/tags.json')).then((response) => {
    return response.json();
})

class DataManager {
    //TODO : load the data and display tags and photographers
    dataList;
    tagList;
    photographerList;
    activeTagMap;

    tagParentElement;
    photographerParentElement;

    constructor(tagParentElement, photographerParentElement) {
        this.tagParentElement = tagParentElement;
        this.photographerParentElement = photographerParentElement;
        this.tagList = new Array();
        this.photographerList = new Array();
        this.activeTagMap = new Map();
    }

    start() {
        tagFile.then((data) => {
            this.dataList = data;
            this.dataList.tags.forEach(tagData => {
                let tag = TagFactory.createInstance(this.tagParentElement, tagData.name);
                this.tagList.push(tag);
            });
        })
        dataFile.then((data) => {
            data.photographers.forEach(phgh => {
                this.photographerList.push(PhotographerFactory.createInstance(this.photographerParentElement, phgh));
            })
        })
    }

    stop() {

    }

    addActiveTag(tag) {
        if(!this.tagList.includes(tag)) return;
        if(this.activeTagMap.has(tag.name)) return;
        this.activeTagMap.set(tag.name, tag);
        this.updateList();
    }

    removeActiveTag(tagName) {
        if(!this.activeTagMap.has(tagName)) return;
        this.activeTagMap.delete(tagName);
        this.updateList();
    }

    updateList() {
        this.photographerList.forEach(value => {
            value.uncheckAllTag();
            value.display(true);
        })
        this.activeTagMap.forEach((value, key) => {
            this.photographerList.forEach(value => {
                if(value.hasTag(key)) {
                    value.checkTag(key);
                } else {
                    value.display(false);
                }
            })
        })
    }
}