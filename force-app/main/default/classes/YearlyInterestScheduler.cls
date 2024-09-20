public with sharing class YearlyInterestScheduler implements Schedulable {
    public void execute(SchedulableContext sc) {
        InterestCalculationScheduler.applyInterestToSavingsAccounts();
    }
}
