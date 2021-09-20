class Photo extends Component{
    id;
    phghId;
    title;
    src;
    tags;
    likes;
    date;
    price;
    isImg;
    imgDom;
    titleDom;
    sectionDom;
    closeBtn;

    constructor(parent, data) {
        super(parent);
        this.id = data.id;
        this.phghId = data.photographerId;
        this.title = data.title;
        if(data.image) {
            this.src = '/assets/sample-photo/' + this.phghId + '/' + data.image;
            this.isImg = true;
        } else {
            this.src = '/assets/sample-photo/' + this.phghId + '/' + data.video;
            this.isImg = false;
        }
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }

    buildUI() {
        this.sectionDom = uDom.CE('section', {id: this.id, className: 'photo-container'});
        if(this.isImg)
        this.imgDom = uDom.CE('img', {src: '../..'+ this.src, className: 'photo-img', alt: this.title});
        else
        this.imgDom = uDom.CE('video', {src: '../..'+ this.src, className: 'photo-img', type: 'video/mp4'});
        let title = uDom.CE('p', {innerText: this.title, className: 'photo-title'});
        let likes = uDom.CE('p', {className: 'photo-likes', innerText: this.likes});
        uDom.AC(this.sectionDom, this.imgDom, title, likes);
        this.imgDom.addEventListener('click', (e) => {dataManager.openPhoto(this)});
        return this.sectionDom;
    }
}