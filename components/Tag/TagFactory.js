class TagFactory {

    static createInstance(parent, tagName) {
        let tag = new Tag(parent, tagName);
        tag.start();
        return tag;
    }
}