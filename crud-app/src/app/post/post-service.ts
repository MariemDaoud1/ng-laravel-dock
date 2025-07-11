import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from './post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = environment.apiUrl + '/post';

  constructor(private http: HttpClient) {}

  // Reuse token header logic
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL, {
      headers: this.getAuthHeaders()
    });
  }

  createPosts(data: Post): Observable<Post> {
    return this.http.post<{ data: Post }>(this.apiURL, data, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data));
  }

  findPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiURL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updatePost(id: number, data: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiURL}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiURL}/upload-image`, formData, {
      headers: this.getAuthHeaders()
    });
  }
}
