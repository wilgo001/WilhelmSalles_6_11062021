class PhotoFullScreen extends Component{
    containerFull;
    containerSec;
    closeBtn;
    arrowLeft;
    arrowRight;
    img;
    photo;

    constructor(parent) {
        super(parent);
    }

    buildUI() {
        this.containerFull = uDom.CE('div', {className: 'full-screen container-full'});
        this.closeBtn = uDom.CE('i', {className: 'full-screen close-btn'});
        this.arrowLeft = uDom.CE('i', {className: 'full-screen left-btn'});
        this.arrowRight = uDom.CE('i', {className: 'full-screen right-btn'});
        this.containerImg = uDom.CE('span', {className: 'full-screen container-img'});
        this.containerSec = uDom.AC(uDom.CE('span', {className: 'full-screen container-sec'}), this.closeBtn, this.arrowLeft, this.containerImg, this.arrowRight);

        this.closeBtn.addEventListener('click', (e)=>{this.closeFullScreen()});
        this.arrowLeft.addEventListener('click', (e)=>{this.prevImg()});
        this.arrowRight.addEventListener('click', (e)=>{this.nextImg()});

        document.body.addEventListener('keydown', (e) =>{
            switch(e.key) {
                case 'ArrowRight' :
                    this.nextImg();
                    break;
                case 'ArrowLeft' :
                    this.prevImg();
                    break;
                case 'Escape' :
                    this.closeFullScreen();
                    break;
            }
        })

        return uDom.AC(this.containerFull, this.containerSec);
    }

    showImg(photo) {
        this.photo = photo;
        if(photo.isImg)
            this.img = uDom.CE('img', {src: '../..'+ photo.src, className: 'full-screen img', alt: this.title});
        else
            this.img = uDom.CE('video', {src: '../..'+ photo.src, className: 'full-screen img', type: 'video/mp4'});
        uDom.AC(this.containerImg, this.img);
        this.containerFull.classList.add('open');
    }

    closeFullScreen() {
        this.containerFull.classList.remove('open');
        this.containerImg.innerHTML = '';
    }

    prevImg() {
        this.closeFullScreen();
        let index = dataManager.photoList.indexOf(this.photo);
        index--;
        if(index < 0)
            this.showImg(dataManager.photoList[dataManager.photoList.length-1]);
        else
            this.showImg(dataManager.photoList[index]);
    }

    nextImg() {
        this.closeFullScreen();
        let index = dataManager.photoList.indexOf(this.photo);
        index++;
        if(index >= dataManager.photoList.length)
            this.showImg(dataManager.photoList[0]);
        else
            this.showImg(dataManager.photoList[index]);
    }
}