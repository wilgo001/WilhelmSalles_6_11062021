const dataManager = new DataManager(null, null);

const start = () => {
    dataManager.tagParentElement = document.querySelector('nav');
    dataManager.photographerParentElement = document.querySelector('main');
    dataManager.startHome();
    document.addEventListener('scroll', (e) => {
        if(document.scrollingElement.scrollTop >= 1) {
            document.getElementById('scroll-button').classList.remove('display-none');
        } else {
            document.getElementById('scroll-button').classList.add('display-none');
        }
    })
}

const scrollEvent = () => {
    document.scrollingElement.scrollTop = 0;
    document.getElementById('scroll-button').classList.add('dipslay-none');
}