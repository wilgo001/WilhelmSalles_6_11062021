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

    stop(){};

    buildUI(){};
}