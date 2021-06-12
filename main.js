const start = () => {
    const navDom = document.querySelector('nav');
    const photographerDiv = document.getElementsByClassName('photographer-list')[0];

    const dataManager = new DataManager(navDom, photographerDiv);
    dataManager.start();
}