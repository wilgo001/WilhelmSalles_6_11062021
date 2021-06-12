class Tag extends Component{
    name;
    button;

    constructor(parent, name) {
        super(parent);
        this.name = name;
    }

    buildUI() {
        let input = uDom.CE('input', {type: 'checkbox', className: 'tag-checkbox', id: 'tag-'+this.name, name: 'tags'});
        let label = uDom.CE('label', {className: 'tag-label', htmlFor: 'tag-'+this.name, innerText: '#'+uString.upperCaseFirstLetter(this.name)});
        let div = uDom.CE('div', {className:'tag-container'});
        uDom.AC(div, input, label);

        input.addEventListener('change', (e) => {this.checkedEvent(e)});

        return div;
    }

    checkedEvent(e) {
        let input = e.target;
        if(input.checked) {
            dataManager.addActiveTag(this);
        } else {
            dataManager.removeActiveTag(this.name);
        }
    }
}