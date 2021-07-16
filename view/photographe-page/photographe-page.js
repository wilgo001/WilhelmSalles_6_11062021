let url = new URL(window.location.href);
const dataManager = new DataManager(null, null);

function start() {
    let id = url.searchParams.get('id');
    if(!id) throw new Error('can\'t display photographer page withour id');
    dataManager.photographerParentElement = document.querySelector('header');
    dataManager.photoParentElement = document.querySelector('main');
    dataManager.startPhgh(id);
}