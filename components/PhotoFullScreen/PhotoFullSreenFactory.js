class PhotoFullScreenFactory {

    static createSingleton(parent) {
        dataManager.photoFullScreen = new PhotoFullScreen(parent);
        dataManager.photoFullScreen.start();
    }
}