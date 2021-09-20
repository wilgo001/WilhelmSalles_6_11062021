class Component {
    mainElement;
    parent;

    constructor(parent) {
        this.parent = parent;

    }

    start() {
        this.mainElement = this.buildUI();
        uDom.AC(this.parent, this.mainElement);
    };

    stop(){
        this.parent.removeChild(this.mainElement);
        this.mainElement = null;
    };

    buildUI(){
        throw new Error("Abstract Method");
    };

    display(boolVar) {
        if(boolVar) this.mainElement.classList.remove('display-none');
        else this.mainElement.classList.add('display-none');
    }
}