import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../interfaces/IPerson';
import { ServiceService } from '../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  person: IPerson;
  registerForm: FormGroup;
  submitted = false;

  constructor(private service: ServiceService, private formBuilder: FormBuilder) {
    this.person = { name: null, email: null, message: null, _id: null };
  }
  processForm() {
    const allInfo = `My name is ${this.person.name}. My email is ${this.person.email}. My message is ${this.person.message}`;
    alert(allInfo);
    this.service.postPerson(this.person).subscribe();
  }

  ngOnInit() {
  }

}
