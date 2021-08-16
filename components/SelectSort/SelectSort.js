class SelectSort extends Component {
    photoList;

    constructor(parent) {
        super(parent);
        this.photoList = new Array();
    }

    buildUI() {
        let container = uDom.CE('nav', {className: 'select-sort container'});
        let label = uDom.CE('label', {innerText: 'Trier par :', className: 'select-sort label'});

        let select = uDom.CE('select', {name: 'sort-select', id: 'sort-select', className: 'select-sort select'});
        let popOption = uDom.CE('option', {value: 'popularity', innerText: 'Popularité'});
        let dateOption = uDom.CE('option', {value: 'date', innerText: 'Date'});
        let titleOption = uDom.CE('option', {value: 'title', innerText: 'Titre'});
        uDom.AC(select, popOption, dateOption, titleOption);
        select.addEventListener('change', (e) => {
            console.log(select.value);
            switch(select.value) {
                case 'popularity':
                    this.photoList.sort(this.sortByPopularity);
                    break;
                case 'date':
                    this.photoList.sort(this.sortByDate);
                    break;
                case 'title':
                    this.photoList.sort(this.sortByTitle);
                    break;
                default:
                    throw new Error('unknown sort type');
            }
            dataManager.resortPhotos(this.photoList);
        });
        uDom.AC(container, label, select);
        return container;
    }

    sortByPopularity(a, b) {
        return a.likes - b.likes;
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