import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { AuthService } from '../Login/auth';

export interface Book {
  id?: number;
  title: string;
  author: string;
  publishedAt: string;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = `${environment.apiUrl}/BooksApi/Books`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, this.getAuthHeaders());
  }

  add(book: Partial<Book>) {
    return this.http.post<Book>(this.apiUrl, book, this.getAuthHeaders());
  }

  update(id: number, book: Partial<Book>) {
    return this.http.put(`${this.apiUrl}/${id}`, book, this.getAuthHeaders());
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
