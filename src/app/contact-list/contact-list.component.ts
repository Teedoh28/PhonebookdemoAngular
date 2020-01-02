import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../contact';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  contactsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  contacts: Observable<Contact[]>;
  contact: Contact = new Contact();
  deleteMessage = false;
  contactlist: any;
  isupdated = false;

  contactupdateform = new FormGroup({
    phonebookEntry_id: new FormControl(),
    contact_name: new FormControl(),
    contact_email: new FormControl(),
    contact_address: new FormControl(),
    contact_msisdn: new FormControl()
  });

  ngOnInit() {
    //this.contact = new Contact();
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.contactService.getContactList().subscribe(data => {
      debugger;


      debugger;
     /* data.forEach( element => {
        this.contact.entry_contactNo = element[2];
        this.contact.entry_name = element[4];
        this.contact.entry_email = element[3];
        this.contact.entry_address = element[1];
      });*/
      this.contacts = data;
      this.dtTrigger.next();
    });
  }

  deleteContact(contact_msisdn: String) {
    this.contactService.deleteContact(contact_msisdn)
      .subscribe(
        deleteContactdata => {
          console.log(deleteContactdata);
          this.deleteMessage = true;
          this.contactService.getContactList().subscribe(
            getContactListResponseData => { this.contacts = getContactListResponseData; });
        }, error => console.log(error));
  }

  updateContact(entry_id: String) {
    this.contactService.getContact(entry_id)
      .subscribe(
        data => {
          this.contactlist = data;
        },
        error => console.log(error));
  }



  updateCont(updateCont) {
    this.contact = new Contact();
    this.contact.entry_contactNo = this.ContactMsisdn.value;
    this.contact.entry_name = this.ContactName.value;
    this.contact.entry_email = this.ContactEmail.value;
    this.contact.entry_address = this.ContactAddress.value;
    debugger;
    console.log(this.ContactAddress.value);

    this.contactService.updateContact(this.contact.entry_contactNo, this.contact).subscribe(
      updateContactdata => {
        this.isupdated = true;
        this.contactService.getContactList().subscribe(data =>
          this.contact = data);
      }, error => console.log(error));
  }

  get ContactName() {
    return this.contactupdateform.get('entry_name');
  }

  get ContactEmail() {
    return this.contactupdateform.get('entry_email');
  }

  get ContactAddress() {
    return this.contactupdateform.get('entry_address');
  }

  get ContactMsisdn() {
    return this.contactupdateform.get('entry_contactNo');
  }

  changeisUpdate() {
    this.isupdated = false;
  }


}
