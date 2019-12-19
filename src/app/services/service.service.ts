import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

import { IPerson } from '../../interfaces/IPerson';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private addPerson = "http://localhost:8080/api/person";  
  private getAllPeople= "http://localhost:8080/api/person"; 
  private deletePerson =  "http://localhost:8080/api/person/";
  constructor(private http: HttpClient) {
  }

  postPerson(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(this.addPerson, { 'name': person.name, 'email': person.email, 'message': person.message });
  }
  getPeople(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.getAllPeople).pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.handleError)
    );
  }
  removePerson(personId: String): Observable<string> {
    return this.http.delete<string>(this.deletePerson+personId);
  }
  handleError(handleError: any): import("rxjs").OperatorFunction<string[], any> {
    console.log("error here bam" + handleError)
    throw new Error("Method not implemented.");
  }
}
