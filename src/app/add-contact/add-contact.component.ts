import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  submitted = false;
  contact: Contact = new Contact();
  contactsaveform = new FormGroup({
    contact_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    contact_email: new FormControl('', [Validators.required, Validators.email]),
    contact_address: new FormControl(),
    contact_msisdn: new FormControl()
  });

  ngOnInit() {
    this.submitted = false;
  }



  saveContact() {
    this.contact = new Contact();
    this.contact.entry_name = this.ContactName.value;
    this.contact.entry_email = this.ContactEmail.value;
    this.contact.entry_address = this.ContactAddress.value;
    this.contact.entry_contactNo = this.ContactMsisdn.value;
    this.submitted = true;
    this.save();
  }



  save() {
    this.contactService.createContact(this.contact)
      .subscribe(data => console.log(data), error => console.log(error));
    this.contact = new Contact();
  }

  get ContactName() {
    return this.contactsaveform.get('contact_name');
  }

  get ContactEmail() {
    return this.contactsaveform.get('contact_email');
  }

  get ContactAddress() {
    return this.contactsaveform.get('contact_address');
  }

  get ContactMsisdn() {
    return this.contactsaveform.get('contact_msisdn');
  }

  addContactForm() {
    this.submitted = false;
    this.contactsaveform.reset();
  }

}
