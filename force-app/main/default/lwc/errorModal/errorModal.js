import { LightningElement, api } from 'lwc';
import errorTitle from "@salesforce/label/c.errorTitle";
import errorBody from "@salesforce/label/c.errorBody";

export default class ErrorModal extends LightningElement {
    @api errorMessage;
    label = {
        errorTitle,
        errorBody
    };
    @api 
    open() {
        const modal = this.template.querySelector('c-modal-base');
        modal.open();
    }

    closeModal() {
        const modal = this.template.querySelector('c-modal-base');
        modal.close();
    }
}