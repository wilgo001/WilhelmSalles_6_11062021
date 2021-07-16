class PhotoFactory {

    static createInstance(parent, data) {
        return new Photo(parent, data);
    }
}