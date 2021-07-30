class uDom {

    static CE(elementType, properties) {
        let element = document.createElement(elementType);
        Object.assign(element, properties);
        return element;
    }

    static AC(parent, ...children) {
        children.forEach(child => {
            parent.appendChild(child);
        });
        return parent;
    }
}