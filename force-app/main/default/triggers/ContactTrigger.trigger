// Write a code (Apex Trigger) that searches for records in the Account object
// where Name = “Acme Inc” and updates the NumberOfEmployees field with the number of contacts linked to the account.
// The trigger is when a Contact record is linked/unlinked to the ”Acme Inc” Account records.

trigger ContactTrigger on Contact(before insert, before update, before delete) {
  // call apex helper class to check if the contact record is now related or previously related to acme inc

  if (Trigger.isInsert) {
    // check if the contact is related to acme inc
    ContactTriggerHelper.checkIfNewContactIsRelatedToAcmeAccount(Trigger.New);
  } else if (Trigger.isUpdate) {
    // check if the contact is or was related to acme inc
    ContactTriggerHelper.checkIfUpdatedContactIsRelatedToAcmeAccount(
      Trigger.New,
      Trigger.Old
    );
  } else if (Trigger.isDelete) {
    // check if the contact was related to acme inc
    ContactTriggerHelper.checkIfDeletedContactWasRelatedToAcmeAccount(
      Trigger.Old
    );
  }
}
