import { LightningElement, api } from 'lwc';
import { updateRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/PBS_Savings_Account__c.Name";
import CURRENTBALANCE_FIELD from "@salesforce/schema/PBS_Savings_Account__c.Current_Balance__c";
import ID_FIELD from "@salesforce/schema/PBS_Savings_Account__c.Id";
import savingsCurrentBalance from "@salesforce/label/c.savingsCurrentBalance";
import savingsAccountName from "@salesforce/label/c.savingsAccountName";

export default class EditSavingsAccountSummary extends LightningElement {

    @api savingsAccountData; 
    @api isEditable;
    @api showSpinner;
    errorMessage;
    saveDisabled = false;
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
        await this.updateSavingsAccount();
    }

    async updateSavingsAccount() {
        this.showSpinner = true;
        const allValid = this.checkAllValid();
        if(allValid) {
            const fields = {};
            fields[ID_FIELD.fieldApiName] = this.savingsAccountData.Id;
            fields[NAME_FIELD.fieldApiName] = this.getCurrentAccountName().getCurrentValue().newValue;
            fields[CURRENTBALANCE_FIELD.fieldApiName] = this.getCurrentAccountBalance().getCurrentValue().newValue;
            const recordInput = { fields };
            await updateRecord(recordInput)
            .then(() =>{
                this.dispatchEvent(new CustomEvent('edited', {
                    detail: recordInput
                }));
                this.closeModal();
            })
            .catch((error) => {
            this.errorMessage = error.body.message;
            this.openErrorModal();
            });
            this.showSpinner = false;
        }
    }

    handleFieldChange(evt) {
        this.saveDisabled = !this.checkAllValid();
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