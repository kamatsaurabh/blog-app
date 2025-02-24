import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ConfigEnum } from '../Enum/config.enum';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.Url}${ConfigEnum.Posts}`;
  
  constructor(private http: HttpClient) {}

  public getAllPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public createPost(title: string, content: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { title, content });
  }

  public deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
