import { LightningElement} from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getSavingsAccountData from '@salesforce/apex/SavingsAccountController.getSavingsAccountData';
import getSavingsAccountHolder from '@salesforce/apex/SavingsAccountController.getSavingsAccountHolder';
import savingsAccountHolder from "@salesforce/label/c.savingsAccountHolder";
import savingsAccountName from "@salesforce/label/c.savingsAccountName";
import savingsAccountStatus from "@salesforce/label/c.savingsAccountStatus";
import savingsAccountTitle from "@salesforce/label/c.savingsAccountTitle";
import savingsCurrentBalance from "@salesforce/label/c.savingsCurrentBalance";
import savingsCustomerNumber from "@salesforce/label/c.savingsCustomerNumber";
import savingsProductCode from "@salesforce/label/c.savingsProductCode";
import pendingAccountMessage from "@salesforce/label/c.pendingAccountMessage";
import blockedAccountMessage from "@salesforce/label/c.blockedAccountMessage";
import closedAccountMessage from "@salesforce/label/c.closedAccountMessage";
import Id from '@salesforce/user/Id';

export default class SavingsAccountSummary extends NavigationMixin(LightningElement) {
    isEditable;
    savingsAccountData;
    currentUserData;
    currentUserId = Id;
    canEdit = false;
    errorMessage;
    showSpinner;
    notActiveMessage;
     label = {
        savingsAccountHolder,
        savingsAccountName,
        savingsAccountStatus,
        savingsAccountTitle,
        savingsCurrentBalance,
        savingsCustomerNumber,
        savingsProductCode,
        pendingAccountMessage,
        blockedAccountMessage,
        closedAccountMessage
    }

    get accountHolderName() {
        return this.currentUserData?.Name;
    }

    get isStatusActive() {
        return this.savingsAccountData?.Status__c === 'Active';
    }

    connectedCallback() {
        if(this.currentUserId) {
            this.getAccountData();
            this.getAccountHolder();
        }
    }

    getAccountHolder() {
        getSavingsAccountHolder({ currentUserId: this.currentUserId }) 
            .then((result) =>{
                    this.currentUserData = result;
            })
            .catch((error) => {
                console.log('error' + JSON.stringify(error));
            });
            
    }

    getAccountData() {
        getSavingsAccountData({ currentUserId: this.currentUserId }) 
            .then((result) =>{
                    this.savingsAccountData = result;
                    this.showSpinner = false;
                    this.getNotActiveMessage();
            })
            .catch((error) => {
                console.log('error' + JSON.stringify(error));
            });
    }

    getNotActiveMessage() {
        const status = this.savingsAccountData.Status__c;
         switch (status) {
            case "Pending":
                this.notActiveMessage = this.label.pendingAccountMessage;
            break;
            case "Blocked":
                this.notActiveMessage = this.label.blockedAccountMessage;
            break;
            case "Closed":
                this.notActiveMessage = this.label.closedAccountMessage;
            break;
            default:
            break;
        }
    }

    handleNewAccount() {
        const createModal = this.template.querySelector('c-create-savings-account-modal');
        createModal.open();
    }

    handleEdit() {
        const editModal = this.template.querySelector('c-edit-savings-account-summary');
        editModal.open();
    }

    async refreshData(evt) {
        this.showSpinner = true;
        await this.getAccountData();
    }

}