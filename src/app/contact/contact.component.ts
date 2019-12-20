import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../interfaces/IPerson';
import { ServiceService } from '../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  person: IPerson;
  registerForm: FormGroup;
  submitted = false;
  isSuccessModalActive = false;
  isFailureModalActive = false;

  constructor(private service: ServiceService, private formBuilder: FormBuilder) {
    this.person = { name: null, email: null, message: null, _id: null };
  }

  toggleSuccessModal() {
    this.isSuccessModalActive = !this.isSuccessModalActive;
  }
  toggleFailureModal() {
    this.isFailureModalActive = !this.isFailureModalActive;
  }

  processForm() {
    if (this.person.name != "" && this.person.email !="") {
      this.service.postPerson(this.person).subscribe();
      this.isSuccessModalActive = true;

      this.person.name = "";
      this.person.email = "";
      this.person.message = "";
    }
    else {
      this.isFailureModalActive = true;
    }
  }

  ngOnInit() {
  }

}
