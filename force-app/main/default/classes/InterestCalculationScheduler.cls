public with sharing class InterestCalculationScheduler {
    public static void applyInterestToSavingsAccounts() {
        List<PBS_Savings_Account__c> savingsAccounts = [
            SELECT Id, Current_Balance__c, Interest_Rate__c
            FROM PBS_Savings_Account__c
            WHERE Status__c = 'Active'
        ];
        
        for (PBS_Savings_Account__c account : savingsAccounts) {
            Decimal interest = account.Current_Balance__c * (account.Interest_Rate__c / 100);
            account.Current_Balance__c += interest;
        }
        
        if (!savingsAccounts.isEmpty()) {
            update savingsAccounts;
        }
    }
}
