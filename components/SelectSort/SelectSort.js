const POPULARITE = 'Popularité';
const DATE = 'Date';
const TITRE = 'Titre';

class SelectSort extends Component {
    photoList;
    selectedSort;
    optionList;
    

    constructor(parent) {
        super(parent);
        this.photoList = new Array();
        this.optionList = new Array();
        this.selectedSort = POPULARITE;
    }

    buildUI() {
        let container = uDom.CE('nav', {className: 'select-sort container'});
        let label = uDom.CE('label', {innerText: 'Trier par :', className: 'select-sort label'});

        let span = uDom.CE('span', {className: 'select-sort select-div'});
        let select = uDom.CE('select', {id: 'sort-select', className: 'select-sort select'});
        let popOption = uDom.CE('option', {value: 'popularity', innerText: POPULARITE});
        let dateOption = uDom.CE('option', {value: 'date', innerText: DATE});
        let titleOption = uDom.CE('option', {value: 'title', innerText: TITRE});
        this.optionList.push(popOption);
        this.optionList.push(dateOption);
        this.optionList.push(titleOption);
        uDom.AC(select, popOption, dateOption, titleOption);
        uDom.AC(span, select);
        
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
            dataManager.resortPhotos(this.photoList);
        });

        let displayContainer = uDom.CE('div', {className: 'select-sort display-container'});
        uDom.AC(span, displayContainer);
        for(let option of this.optionList) {
            let optionDisplay = uDom.CE('label', {innerText: option.innerText, className: 'select-sort display-option'});
            uDom.AC(displayContainer, optionDisplay);
        }


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