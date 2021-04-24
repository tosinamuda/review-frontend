import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<object> {
    return this.http.get(`${environment.baseUrl}/organizations`);
  }
}
