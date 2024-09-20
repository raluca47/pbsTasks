import {LightningElement, api} from 'lwc';
import {NavigationMixin} from "lightning/navigation";
import { validateInput } from "c/inputValidator";

const TYPE = {
    CURRENCY: "currency"
}

export default class PbsCustomField extends NavigationMixin(LightningElement) {
    @api inputType = "input";
    @api type = "text";
    @api value;
    @api name;
    @api variant = 'label-hidden';
    @api placeholder;
    @api required;
    @api disabled;
    @api isEditable;
    @api formatter;
    @api label = "EMPTY";
    @api readOnly;
    @api typeAttributes = {};
    @api validationType;
    inputId = 'input';
    newValue;

    get isCurrency() {
        return this.type === TYPE.CURRENCY || this.formatter === TYPE.CURRENCY
    }

    get edit() {
        return !this.readOnly && this.isEditable;
    }

    get element() {
        return this.template.querySelector(`[data-id="${this.inputId}"]`);
    }

    get currentInputValue() {
        return this.element.value || this.element.getAttribute("value") || this.element.dataset.value;
    }

    get element() {
        return this.template.querySelector(`[data-id="${this.inputId}"]`);
    }

    async connectedCallback() {
        if (this.isCurrency) {
            this.setupCurrencyAttributes();
        }
    }

    @api
    getCurrentValue() {
        this.value = this.processBoolValues(this.value);
        let newValue;
        if (this.newValue) {
            newValue = this.processBoolValues(this.newValue);
        } else {
            newValue = this.value;
        }

        const errors = this.validate(this.validationType, newValue);
        return {newValue: this.newValue, value: this.value, errors: errors, name: this.name};
    }

    @api checkValidity() {
        const validator = this.validate(this.validationType, this.currentInputValue);
        return validator.isValid;
    }

    handleChange(evt) {
        this.newValue = this.processBoolValues(evt.currentTarget.value);
        this.value = this.processBoolValues(this.value);
        const errors = this.validate(this.validationType, this.newValue);
        const args = {newValue: this.newValue, value: this.value, errors: errors};
        this.dispatchEvent(new CustomEvent('changed', {
            detail: args
        }));
    }

    processBoolValues(value) {
        if (value === "true" || value === "false") {
            return value === "true";
        } else {
            return value;
        }
    }

    validate(validationType, value) {
        const validator = validateInput(validationType, value);
        if(validator.isValid){
            this.element.setCustomValidity('');
        } else {
            this.element.setCustomValidity(validator.message);
        }
        this.element.reportValidity();
        return validator;
    }

    hasTypeAttributes() {
        return hasKeys(this.typeAttributes);
    }

    setupCurrencyAttributes() {
        this.typeAttributes = this.hasTypeAttributes()
            ? this.typeAttributes
            : {currencyCode: 'RON', step: 0.01};
        this.formatter = this.formatter || "currency";
        this.type = "number";
    }
    
}