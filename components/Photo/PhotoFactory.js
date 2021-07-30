class PhotoFactory {

    static createInstance(parent, data) {
        let photo = new Photo(parent, data);
        photo.start();
        return photo;
    }
}