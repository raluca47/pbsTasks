import { LightningElement, api } from 'lwc';

export default class LabeledField extends LightningElement {
    @api label;
    @api value;
    @api isEditable;
    @api isCurrency;
    @api validationType;

    handleChange(evt) {
        this.dispatchEvent(new CustomEvent('changed', {detail: evt.detail}));
    }

    @api
    getCurrentValue() {
        return this.getFieldElement().getCurrentValue();
    }

    @api checkValidity() {
        return this.getFieldElement().checkValidity();
    }

    getFieldElement() {
        return this.template.querySelector('c-field');
    }
}