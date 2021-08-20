const POPULARITE = 'Popularité';
const DATE = 'Date';
const TITRE = 'Titre';

class SelectSort extends Component {
    photoList;
    selectedSort;
    

    constructor(parent) {
        super(parent);
        this.photoList = new Array();
        this.selectedSort = POPULARITE;
    }

    buildUI() {
        let container = uDom.CE('nav', {className: 'select-sort container'});
        let label = uDom.CE('label', {innerText: 'Trier par :', className: 'select-sort label'});

        let span = uDom.CE('span', {className: 'select-sort select-div'});
        let button = uDom.CE('button', {innerText: this.selectedSort, className: 'select-sort button'});
        let select = uDom.CE('select', {name: 'sort-select', size:"3", id: 'sort-select', className: 'select-sort select display-none'});
        let popOption = uDom.CE('option', {value: 'popularity', innerText: POPULARITE});
        let dateOption = uDom.CE('option', {value: 'date', innerText: 'Date'});
        let titleOption = uDom.CE('option', {value: 'title', innerText: 'Titre'});
        uDom.AC(select, popOption, dateOption, titleOption);
        uDom.AC(span, button, select);
        button.addEventListener('click', (e) => {
            select.classList.remove('display-none');
        })
        select.addEventListener('change', (e) => {
            switch(select.value) {
                case 'popularity':
                    this.selectedSort = POPULARITE;
                    this.photoList.sort(this.sortByPopularity);
                    break;
                case 'date':
                    this.selectedSort = DATE;
                    this.photoList.sort(this.sortByDate);
                    break;
                case 'title':
                    this.selectedSort = TITRE;
                    this.photoList.sort(this.sortByTitle);
                    break;
                default:
                    throw new Error('unknown sort type');
            }
            select.classList.add('display-none');
            dataManager.resortPhotos(this.photoList);
        });
        uDom.AC(container, label, span);
        return container;
    }

    sortByPopularity(a, b) {
        return b.likes - a.likes;
    }

    sortByDate(a, b) {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return aDate - bDate;
    }

    sortByTitle(a, b) {
        return ('' + a.title).localeCompare(b.title);
    }
}