const dataFile = fetch(new Request('data/data.json')).then((response) => {
    return response.json();
})
const tagFile = fetch(new Request('data/tags.json')).then((response) => {
    return response.json();
})

class DataManager {
    //TODO : load the data and display tags and photographers
    dataList;
    tagMap;
    photographerList;
    activeTagMap;

    tagParentElement;
    photographerParentElement;
    photoParentElement;

    photoList;

    photoFullScreen;

    constructor(tagParentElement, photographerParentElement) {
        this.tagParentElement = tagParentElement;
        this.photographerParentElement = photographerParentElement;
        this.tagMap = new Map();
        this.photographerList = new Array();
        this.activeTagMap = new Map();
        this.photoList = new Array();
    }

    startHome() {
        tagFile.then((data) => {
            this.dataList = data;
            this.dataList.tags.forEach(tagData => {
                let tag = TagFactory.createInstanceFromHome(this.tagParentElement, tagData.name);
                this.tagMap.set(tag.name, tag);
            });
            this.addActiveTagFromUrl();
        })
        dataFile.then((data) => {
            data.photographers.forEach(phgh => {
                this.photographerList.push(PhotographerFactory.createInstanceFromHome(this.photographerParentElement, phgh));
            })
        })
    }

    startPhgh(id) {
        PhotoFullScreenFactory.createSingleton(this.photoParentElement);
        dataFile.then((data)=> {
            data.media.forEach(photo => {
                if(photo.photographerId == id) {
                    let photoDom = PhotoFactory.createInstance(this.photoParentElement, photo);
                    this.photoList.push(photoDom);
                }
            });
            data.photographers.forEach(phgh => {
                if(phgh.id == id) {
                    PhotographerFactory.createInstanceFromPhgh(this.photographerParentElement, phgh);
                }
            });
            SelectSortFactory.getInstance(this.photographerParentElement, this.photoList);
        })
    }

    stop() {

    }

    addActiveTagFromUrl() {
        let url = new URL(window.location.href);
        let tag = url.searchParams.get('tag');
        if(tag) {
            this.tagMap.get(tag).setCheck();
            if(tag) this.addActiveTag(this.tagMap.get(tag));
        }
    }

    addActiveTag(tag) {
        if(!this.tagMap.has(tag.name)) return;
        if(this.activeTagMap.has(tag.name)) return;
        this.activeTagMap.set(tag.name, tag);
        this.updateList();
    }

    removeActiveTag(tagName) {
        if(!this.tagMap.has(tagName)) return;
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

    openPhoto(photo) {
        this.photoFullScreen.showImg(photo);
    }

    getLikes() {
        let sum = 0;
        for(let photo of this.photoList) {
            sum += photo.likes;
        }
        return sum;
    }

    resortPhotos(photoList) {
        this.photoList.forEach((photo) => {
            photo.stop();
        })
        this.photoList = photoList;
        this.photoList.forEach((photo) => {
            photo.start();
        })
    }

}