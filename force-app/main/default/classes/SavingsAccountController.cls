public with sharing class SavingsAccountController {
    @AuraEnabled
    public static PBS_Savings_Account__c getSavingsAccountData(String currentUserId) {
        PBS_Savings_Account__c savingsAccount = [SELECT Id, Name, Customer_Number__c, Current_Balance__c, Product_Code__c, CreatedById, Status__c, OwnerId FROM PBS_Savings_Account__c WHERE OwnerId =: currentUserId];
        return savingsAccount;
    }

    @AuraEnabled
    public static User getSavingsAccountHolder(String currentUserId) {
        User currentUser = [SELECT Name, Id FROM User WHERE Id =: currentUserId];
        return currentUser;
    }
}
