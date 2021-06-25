class Photographer extends Component {
    name;
    id;
    city;
    country;
    tags;
    tagLine;
    price;
    urlProfilPhoto;
    tagMap;


    constructor(parent, data) {
        super(parent);
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tags = data.tags;
        this.tagLine = data.tagline;
        this.price = data.price;
        this.urlProfilPhoto = 'assets/sample-photo/photographers/' + data.portrait;
        this.tagMap = new Map();
    }

    buildUI() {
        let container = uDom.CE('article', {className: 'phgh-container'});

        let head = uDom.CE('a', {className: 'phgh-head', href: 'view/photographe-page/'+ this.id});
        let domName = uDom.CE('h2', {className: 'phgh-name', innerText: this.name});
        let domImg = uDom.CE('img', {className: 'phgh-image', src: this.urlProfilPhoto});
        let content = uDom.CE('div', {className: 'phgh-content'});
        let domLoc = uDom.CE('p', {className: 'phgh-localisation', innerText: this.city + ', ' + this.country});
        let domDesc = uDom.CE('p', {className: 'phgh-desc', innerText: this.tagLine});
        let domPrice = uDom.CE('p', {className: 'phgh-price', innerText: this.price + '€/jour'});
        let domTags = uDom.CE('div', {className: 'phgh-tag-list'});
        this.tags.forEach(tagData => {
            this.tagMap.set(tagData, TagFactory.createInstance(domTags, tagData));
        });

        uDom.AC(head, domImg, domName);
        uDom.AC(content, domLoc, domDesc, domPrice);
        uDom.AC(container, head, content, domTags);


        // if(page) this.displayPage();
        // else this.displayArticle();

        return container;
    }

    uncheckAllTag() {
        this.tagMap.forEach((value, key)=> {
            value.setUncheck();
        })
    }

    checkTag(tagName) {
        this.tagMap.get(tagName).setCheck();
    }

    hasTag(tagName) {
        return this.tagMap.has(tagName);
    }
}