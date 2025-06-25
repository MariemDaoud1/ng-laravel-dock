import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<Post>(this.apiURL,data);}
}
