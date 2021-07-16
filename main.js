const dataManager = new DataManager(null, null);

const start = () => {
    dataManager.tagParentElement = document.querySelector('nav');
    dataManager.photographerParentElement = document.querySelector('main');
    dataManager.startHome();
}