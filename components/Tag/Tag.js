class Tag extends Component{
    name;
    button;
    input;
    phghPage;

    constructor(parent, name, phghPage) {
        super(parent);
        this.name = name;
        this.phghPage = phghPage
    }

    buildUI() {
        this.input = uDom.CE('input', {type: 'checkbox', className: 'tag-checkbox', id: 'tag-'+this.name, name: 'tags'});
        let label = uDom.CE('label', {className: 'tag-label', htmlFor: 'tag-'+this.name, innerText: '#'+uString.upperCaseFirstLetter(this.name)});
        let div = uDom.CE('a', {className:'tag-container'});
        uDom.AC(div, this.input, label);

        this.input.addEventListener('change', (e) => {this.checkedEvent(e)});

        return div;
    }

    checkedEvent(e) {
        if(this.input.checked) {
            if(this.phghPage) this.openIndexWithTag();
            else dataManager.addActiveTag(this);
        } else {
            dataManager.removeActiveTag(this.name);
        }
    }

    openIndexWithTag() {
        location.href = '../../index.html?tag='+ this.name;
    }

    setCheck() {
        this.input.checked = true;
    }

    setUncheck() {
        this.input.checked = false;
    }
}