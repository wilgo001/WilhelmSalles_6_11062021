class PhotographerFactory {

    static createInstance(parent, data) {
        let instance = new Photographer(parent, data);
        instance.start();
        return instance;
    }

}