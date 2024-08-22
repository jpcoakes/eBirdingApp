public with sharing class ContactTriggerHelper {
  public static void checkIfNewContactIsRelatedToAcmeAccount(
    List<Contact> contacts
  ) {
    // grab acme account id and NumberofEmployees fields
    Account acmeAcc = [
      SELECT Id, NumberOfEmployees
      FROM Account
      WHERE Name = 'Acme Inc'
      WITH SECURITY_ENFORCED
      LIMIT 1
    ];
    List<Contact> contactList = new List<Contact>();
    for (Contact c : contacts) {
      // check if contact is related to acme account
      if (c.AccountId == acmeAcc.Id) {
        contactList.add(c);
      }
    }
    if (acmeAcc.NumberOfEmployees != null) {
      acmeAcc.NumberOfEmployees += contactList?.size();
    } else {
      acmeAcc.NumberOfEmployees = contactList?.size();
    }
    update acmeAcc;
  }

  public static void checkIfUpdatedContactIsRelatedToAcmeAccount(
    List<Contact> newContacts,
    List<Contact> oldContacts
  ) {
    // grab acme account id and NumberofEmployees fields
    Account acmeAcc = [
      SELECT Id, NumberOfEmployees
      FROM Account
      WHERE Name = 'Acme Inc'
      WITH SECURITY_ENFORCED
      LIMIT 1
    ];
    List<Contact> nowRelatedContactList = new List<Contact>();
    List<Contact> usedToBeRelatedContactList = new List<Contact>();
    for (Contact c : newContacts) {
      // check if contact is related to acme account
      if (c.AccountId == acmeAcc.Id) {
        nowRelatedContactList.add(c);
      }
    }
    for (Contact c : oldContacts) {
      // check if contact was related to acme account
      if (c.AccountId == acmeAcc.Id) {
        usedToBeRelatedContactList.add(c);
      }
    }
    // add the nowRelated size - usedToBeRelated size to the existing acmeAcc numberOfEmployees.
    if (acmeAcc.NumberOfEmployees != null) {
      acmeAcc.NumberOfEmployees += (nowRelatedContactList?.size() -
      usedToBeRelatedContactList?.size());
    } else {
      acmeAcc.NumberOfEmployees = (nowRelatedContactList?.size() -
      usedToBeRelatedContactList?.size());
    }
    update acmeAcc;
  }

  public static void checkIfDeletedContactWasRelatedToAcmeAccount(
    List<Contact> oldContacts
  ) {
    // grab acme account id and NumberofEmployees fields
    Account acmeAcc = [
      SELECT Id, NumberOfEmployees
      FROM Account
      WHERE Name = 'Acme Inc'
      WITH SECURITY_ENFORCED
      LIMIT 1
    ];
    List<Contact> contactList = new List<Contact>();
    for (Contact c : oldContacts) {
      // check if contact was related to acme account
      if (c.AccountId == acmeAcc.Id) {
        contactList.add(c);
      }
    }
    if (acmeAcc.NumberOfEmployees != null) {
      acmeAcc.NumberOfEmployees -= contactList?.size();
    }
    update acmeAcc;
  }
}
