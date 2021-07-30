class PhotoFullScreen extends Component{
    containerFull;
    containerSec;
    closeBtn;
    arrowLeft;
    arrowRight;
    img;

    constructor(parent) {
        super(parent);
    }

    buildUI() {
        this.containerFull = uDom.CE('div', {className: 'full-screen container-full'});
        this.closeBtn = uDom.CE('i', {className: 'full-sreen close-btn'});
        this.arrowLeft = uDom.CE('i', {className: 'full-screen left-btn'});
        this.arrowRight = uDom.CE('i', {className: 'full-screen right-btn'});
        this.containerImg = uDom.CE('div', {className: 'full-screen container-img'});
        this.containerSec = uDom.AC(uDom.CE('div', {className: 'full-screen container-sec'}), this.closeBtn, this.arrowLeft, this.containerImg, this.arrowRight);

        this.closeBtn.addEventListener('click', (e)=>{this.closeFullScreen()});
        this.arrowLeft.addEventListener('click', (e)=>{this.prevImg()});
        this.arrowRight.addEventListener('click', (e)=>{this.nextImg()});

        return uDom.AC(this.containerFull, this.containerSec);
    }

    showImg(photo) {
        if(photo.isImg)
            this.img = uDom.CE('img', {src: '../..'+ photo.src, className: 'full-sreen img', alt: this.title});
        else
            this.img = uDom.CE('video', {src: '../..'+ photo.src, className: 'full-screen img', type: 'video/mp4'});
        uDom.AC(this.containerImg, this.img);
        this.containerFull.classList.add('open');
    }

    closeFullScreen() {

    }

    prevImg() {

    }

    nextImg() {

    }
}