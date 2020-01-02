import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    })
  };
@Injectable({
providedIn: 'root'
})
export class ContactService {

private baseUrl = 'http://localhost:8080/phonebookdemo/api/';

constructor(private http: HttpClient) { }

getContactList(): Observable<any> {
return this.http.get(`${this.baseUrl}` + 'retrieve-list', httpOptions);
}

createContact(contact: object): Observable<object> {
return this.http.post(`${this.baseUrl}save-entry`, contact, httpOptions);
}

deleteContact(entry_id: String): Observable<any> {
return this.http.delete(`${this.baseUrl}delete-entry/${entry_id}`, { responseType: 'text' });
}

getContact(entry_id: String): Observable<Object> {
return this.http.get(`${this.baseUrl}phonebook/${entry_id}`, httpOptions);
}

updateContact(entry_id: String, value: any): Observable<Object> {
return this.http.post(`${this.baseUrl}update-entry/${entry_id}`, value);
}
}
