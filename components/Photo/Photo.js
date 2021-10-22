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
    liked

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
        this.liked = false;
    }

    buildUI() {
        this.sectionDom = uDom.CE('section', {id: this.id, className: 'photo-container'});
        if(this.isImg)
        this.imgDom = uDom.CE('img', {src: '../..'+ this.src, className: 'photo-img', alt: this.title, tabIndex: '0'});
        else
        this.imgDom = uDom.CE('video', {src: '../..'+ this.src, className: 'photo-img', type: 'video/mp4'});
        let title = uDom.CE('p', {innerText: this.title, className: 'photo-title'});
        let likes = uDom.CE('p', {className: 'photo-likes', innerText: this.likes, tabIndex: '0'});
        uDom.AC(this.sectionDom, this.imgDom, title, likes);
        this.imgDom.addEventListener('click', (e) => {dataManager.openPhoto(this)});
        this.imgDom.addEventListener('keyup', (e)=>{
            if(e.key == 'Enter') {
                dataManager.openPhoto(this);
            }
        })
        likes.addEventListener('click', (e) => {this.likeEvent(e)});
        likes.addEventListener('keyup', (e)=>{
            if(e.key == 'Enter') {
                this.likeEvent(e);
            }
        })

        return this.sectionDom;
    }

    likeEvent(e) {
        if(this.liked) {
            this.likes -= 1;
            this.liked = false;
        }else {
            this.likes += 1;
            this.liked = true;
        }
        e.target.classList.toggle('liked');
        e.target.innerText = this.likes;
        dataManager.incrementsLike(this.id);
    }
}