const FIRST_NAME = 'form-first-name';
const LAST_NAME = 'form-last-name';
const EMAIL = 'form-email';
const MESSAGE = 'form-message';

class ContactForm extends Component {
    id;
    name;

    container;

    constructor(parent, id, name) {
        super(parent);
        this.id = id;
        this.name = name;
    }

    buildUI() {
        this.container = uDom.CE('form', {className: 'form-container'})
        let title = uDom.CE('h2', {className: 'form-title', innerText: 'Contactez-moi\n' + this.name});
        let firstNameLabel = uDom.CE('label', {className: FIRST_NAME + ' label', innerText: 'Prénom', htmlFor: FIRST_NAME});
        let lastNameLabel = uDom.CE('label', {className: LAST_NAME + ' label', innerText: 'Nom', htmlFor: LAST_NAME});
        let emailLabel = uDom.CE('label', {className: EMAIL + ' label', innerText: 'Email', htmlFor: EMAIL});
        let msgLabel = uDom.CE('label', {className: MESSAGE + ' label', innerText: 'Votre message', htmlFor: MESSAGE});

        let firstNameInput = uDom.CE('input', {className: FIRST_NAME + ' input', type: 'text', id:FIRST_NAME, tabIndex: '0'});
        let lastNameInput = uDom.CE('input', {className: LAST_NAME + ' input', type: 'text', id:LAST_NAME, tabIndex: '0'});
        let emailInput = uDom.CE('input', {className: EMAIL + ' input', type: 'email', id:EMAIL, tabIndex: '0'});
        let msgInput = uDom.CE('textarea', {className: MESSAGE + ' input', rows: '5', id:MESSAGE, tabIndex: '0'});
        let submit = uDom.CE('input', {className: 'form-submit-btn', type:'submit'});
        submit.addEventListener('input', (e) => {
            this.submit();
        })

        let closeBtn = uDom.CE('button', {className: 'form-close-btn'});
        closeBtn.addEventListener('click', (e)=>{this.stop()});

        document.body.addEventListener('keyup', (e) => {        
            if(e.key == 'Escape') {
                this.stop();
            }
        })

        firstNameInput.focus();

        uDom.AC(this.container, title, firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, emailLabel, emailInput, msgLabel, msgInput, submit, closeBtn);
        return this.container;
    }

    submit() {
        this.stop();
    }

    stop() {
        super.stop();
        dataManager.closeForm();
    }
}