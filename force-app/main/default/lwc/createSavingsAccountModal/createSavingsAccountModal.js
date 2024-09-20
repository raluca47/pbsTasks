import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import SAVINGSACCOUNT_OBJECT from "@salesforce/schema/PBS_Savings_Account__c";
import NAME_FIELD from "@salesforce/schema/PBS_Savings_Account__c.Name";
import CURRENTBALANCE_FIELD from "@salesforce/schema/PBS_Savings_Account__c.Current_Balance__c";
import savingsCurrentBalance from "@salesforce/label/c.savingsCurrentBalance";
import savingsAccountName from "@salesforce/label/c.savingsAccountName";

export default class CreateSavingsAccountModal extends LightningElement {

    @api savingsAccountData; 
    @api isEditable;
    errorMessage;
    showSpinner = false;
    label = {
        savingsCurrentBalance,
        savingsAccountName
    }

    @api 
    open() {
        const modal = this.template.querySelector('c-modal-base');
        modal.open();
    }

    async handleSave() {
        await this.createSavingsAccount();
        this.closeModal();
    }

    async createSavingsAccount() {
        this.showSpinner = true;
        const allValid = this.checkAllValid();
        if(allValid) {
            const fields = {};
            fields[NAME_FIELD.fieldApiName] = this.getCurrentAccountName().getCurrentValue().newValue;
            fields[CURRENTBALANCE_FIELD.fieldApiName] = this.getCurrentAccountBalance().getCurrentValue().newValue;
            const recordInput = {apiName: SAVINGSACCOUNT_OBJECT.objectApiName, fields };
            try {
                const savingsAccount = await createRecord(recordInput);
                this.dispatchEvent(new CustomEvent('created', {
                    detail: savingsAccount
                }));
            }
            catch(error) {
            this.errorMessage = error.body.message;
            this.openErrorModal();
            };
            this.showSpinner = false;
        }
    }

    checkAllValid() {
        return this.getCurrentAccountName()?.checkValidity() && this.getCurrentAccountBalance()?.checkValidity();
    }

    getCurrentAccountName() {
        const savingsAccountName = this.template.querySelector('c-labeled-field[data-id="Name"]');
        return savingsAccountName;
    }

    getCurrentAccountBalance() {
        const savingsAccountBalance = this.template.querySelector('c-labeled-field[data-id="Balance"]');
        return savingsAccountBalance;
    }

    openErrorModal() {
        const errorModal = this.template.querySelector('c-error-modal');
        errorModal?.open();
    }

    closeModal() {
        const modal = this.template.querySelector('c-modal-base');
        modal.close();
    }
}