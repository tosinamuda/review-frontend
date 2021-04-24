import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseInterface } from 'src/app/interfaces/response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  addNewReview(data): Observable<object> {
    return this.http.post(`${environment.baseUrl}/reviews/create`, data);
  }

}
