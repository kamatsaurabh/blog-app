import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';  // Your NestJS API URL

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPost(title: string, content: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { title, content });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
