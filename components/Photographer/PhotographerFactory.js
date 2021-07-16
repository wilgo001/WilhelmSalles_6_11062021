class PhotographerFactory {

    static createInstanceFromHome(parent, data) {
        return PhotographerFactory.createInstance(parent, data, false);
    }


    static createInstanceFromPhgh(parent, data) {
        return PhotographerFactory.createInstance(parent, data, true);
    }

    static createInstance(parent, data, bool) {
        let instance = new Photographer(parent, data, bool);
        instance.start();
        return instance;
    }

}