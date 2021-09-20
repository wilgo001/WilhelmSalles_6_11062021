class TagFactory {

    static createInstanceFromHome(parent, tagName) {
        return TagFactory.createInstance(parent, tagName, false);
    }

    static createInstanceFromPhgh(parent, tagName) {
        return TagFactory.createInstance(parent, tagName, true);
    }

    static createInstance(parent, tagName, bool) {
        let tag = new Tag(parent, tagName, bool);
        tag.start();
        return tag;
    }
}