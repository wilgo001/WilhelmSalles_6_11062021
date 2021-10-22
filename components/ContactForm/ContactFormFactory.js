class ContactFormFactory {
    
    static createInstance(parent, name, id) {
        let instance = new ContactForm(parent, id, name);
        instance.start();
        return instance;
    }
}