import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL ="http://localhost:8000/api/post";

  constructor(private http:HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiURL);
  }

  createPosts(data: Post): Observable<Post>{
    return this.http.post<{data: Post}>(this.apiURL, data).pipe(
      // Extract the 'data' property from the response
      map(response => response.data)
    );
  }


  findPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiURL}/${id}`);
  }

  updatePost(id: number, data: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiURL}/${id}`, data);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiURL}/upload-image`, formData);
  }
  
}
