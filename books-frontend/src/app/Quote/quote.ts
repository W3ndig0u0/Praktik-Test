import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface Quote {
  id?: number;
  text: string;
  author: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = `${environment.apiUrl}/BooksApi/Quotes`;

  constructor(private http: HttpClient) {}

  get(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  add(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, quote);
  }

  update(id: number, quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${this.apiUrl}/${id}`, quote);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
