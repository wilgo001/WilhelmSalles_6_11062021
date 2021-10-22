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
    phghPage;
    domLike;


    constructor(parent, data, phghPage) {
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
        this.phghPage = phghPage;
    }

    buildUI() {
        if(this.phghPage) return this.displayPhgh();
        else return this.displayHome();
    }

    displayHome() {
        let container = uDom.CE('article', {className: 'phgh-container home-page'});

        let head = uDom.CE('a', {className: 'phgh-head', href: 'view/photographe-page/photographe-page.html?id='+ this.id});
        let domName = uDom.CE('h2', {className: 'phgh-name', innerText: this.name});
        let domImg = uDom.CE('img', {className: 'phgh-image', src: this.urlProfilPhoto});
        let content = uDom.CE('div', {className: 'phgh-content'});
        let domLoc = uDom.CE('p', {className: 'phgh-localisation', innerText: this.city + ', ' + this.country});
        let domDesc = uDom.CE('p', {className: 'phgh-desc', innerText: this.tagLine});
        let domPrice = uDom.CE('p', {className: 'phgh-price', innerText: this.price + '€/jour'});

        uDom.AC(head, domImg, domName);
        uDom.AC(content, domLoc, domDesc, domPrice);
        uDom.AC(container, head, content, this.displayTags());
        return container;
    }

    displayPhgh() {
        let container = uDom.CE('article', {className: 'phgh-container phgh-page'});
        let content = uDom.CE('div', {className: 'phgh-content'});

        let domName = uDom.CE('h1', {className: 'phgh-name', innerText: this.name});
        let buttonContact = uDom.CE('button', {className: 'phgh-contact-btn', innerText: 'contactez moi'});
        let domImg = uDom.CE('img', {className: 'phgh-image', src: '../../'+this.urlProfilPhoto});
        let domLoc = uDom.CE('p', {className: 'phgh-localisation', innerText: this.city + ', ' + this.country});
        let domDesc = uDom.CE('p', {className: 'phgh-desc', innerText: this.tagLine});
        let domStat = uDom.CE('span', {className: 'phgh-stat'});
        this.domLike = uDom.CE('p', {className: 'phgh-likes', innerText: dataManager.getLikes()});
        let domPrice = uDom.CE('p', {className: 'phgh-price', innerText: this.price + '€/jour'});

        buttonContact.addEventListener('click', (e) => {dataManager.openForm(this.id, this.name)});

        uDom.AC(content, domName, buttonContact, domLoc, domDesc,  this.displayTags(), domImg);
        uDom.AC(domStat, this.domLike, domPrice);
        uDom.AC(container, content, domStat);
        return container;


    }

    displayTags() {
        let domTags = uDom.CE('div', {className: 'phgh-tag-list'});
        this.tags.forEach(tagData => {
            this.tagMap.set(tagData, TagFactory.createInstance(domTags, tagData, this.phghPage));
        });
        return domTags;
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

    updateLikes() {
        this.domLike.innerText = dataManager.getLikes();
    }
}