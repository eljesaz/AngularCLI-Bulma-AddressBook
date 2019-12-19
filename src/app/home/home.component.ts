import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { IPerson } from '../../interfaces/IPerson';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  people: IPerson[];
  isModalActive : boolean = false;
  selectedIdForCRUD : string = "";

  constructor(private service: ServiceService) {
  }

  getAllUsers() {
    this.service.getPeople().subscribe((data: IPerson[]) => {
      this.people = Object.values(data);
      console.log(this.people);
    });
  }

  toggleModal(event , personId : string){
    this.isModalActive = !this.isModalActive;
    this.selectedIdForCRUD = personId;
  }

  deleteUser(id: string) {
    this.service.removePerson(id).subscribe();
  }

  deletePerson(event, item){
    this.deleteUser(item);
    this.isModalActive = !this.isModalActive; 
    this.getAllUsers(); 
  }

  ngOnInit() {
    this.getAllUsers();
  }
}
