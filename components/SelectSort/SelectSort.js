const POPULARITE = 'Popularité';
const DATE = 'Date';
const TITRE = 'Titre';
const SORT = 'sort';

class SelectSort extends Component {
    photoList;
    selectedSort;
    optionList;
    optionsContainer;
    buttonDisplay;
    

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
        this.buttonDisplay = uDom.CE('button', {id: 'sort-select', className: 'select-sort select', innerText:this.selectedSort});
        let popOption = uDom.CE('input', {value: POPULARITE, name: SORT, id: POPULARITE, type: 'radio'});
        let dateOption = uDom.CE('input', {value: DATE, name: SORT, id: DATE, type: 'radio'});
        let titleOption = uDom.CE('input', {value: TITRE, name: SORT, id: TITRE, type: 'radio'});
        this.optionList.push(popOption);
        this.optionList.push(dateOption);
        this.optionList.push(titleOption);
        uDom.AC(span, this.buttonDisplay);


        this.optionsContainer = uDom.CE('div', {className: 'select-sort display-container display-none'});
        this.buttonDisplay.addEventListener('click',(e) => {
            this.optionsContainer.classList.remove('display-none');
        })
        document.body.addEventListener('click', (e) => {
            if(!e.target.closest('.select-sort.select-div'))
                this.optionsContainer.classList.add('display-none');
        })
        this.buttonDisplay.addEventListener
        uDom.AC(span, this.optionsContainer);
        for(let option of this.optionList) {
            option.addEventListener('change', (e) => {this.onSelectSort(e.target.value)});
            option.addEventListener('keydown', (e) => {
                if(e.key == 'Escape' || e.key == 'Enter') {
                    this.optionsContainer.classList.add('display-none');
                }
            })
            let optionDisplay = uDom.CE('label', {innerText: option.value, htmlFor: option.value, className: 'select-sort display-option'});
            uDom.AC(this.optionsContainer, option, optionDisplay);
            console.log(optionDisplay);
        }

        uDom.AC(container, label, span);
        return container;
    }

    onSelectSort(sort) {
        switch(sort) {
            case POPULARITE:
                this.selectedSort = POPULARITE;
                this.photoList.sort(this.sortByPopularity);
                break;
            case DATE:
                this.selectedSort = DATE;
                this.photoList.sort(this.sortByDate);
                break;
            case TITRE:
                this.selectedSort = TITRE;
                this.photoList.sort(this.sortByTitle);
                break;
            default:
                throw new Error('unknown sort type');
        }
        this.buttonDisplay.innerText = sort;
        dataManager.resortPhotos(this.photoList);
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