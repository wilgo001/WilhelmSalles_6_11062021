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
        this.activeTagList = new Map();
    }

    start() {
        tagFile.then((data) => {
            this.dataList = data;
            this.dataList.tags.forEach(tagData => {
                let tag = new Tag(this.tagParentElement, tagData.name);
                tag.start();
                this.tagList.push(tag);
            });
        })
        dataFile.then((data) => {

        })
    }

    stop() {

    }

    addActiveTag(tag) {
        if(!this.tagList.has(tag.name)) return;
        if(this.activeTagList.has(tag.name)) return;
        this.activeTagList.set(tag.name, tag);
        this.updateList();
    }

    removeActiveTag(tagName) {
        if(!this.tagList.has(tagName)) return;
        if(!this.activeTagList.has(tagName)) return;
        this.activeTagList.delete(tagName);
        this.updateList();
    }

    updateList() {

    }
}