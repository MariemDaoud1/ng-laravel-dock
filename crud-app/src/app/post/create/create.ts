import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-create',
  imports: [RouterModule,FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
  title = '';
  description = '';
  error="";



  constructor(private postService: PostService, private router: Router) {}
  
  submit(){
    if (!this.title || !this.description) {
      this.error = 'Title and description are required!';
      return;
    }
    const input = {
      Title: this.title,
      description: this.description
    }
    this.postService.createPosts(input).subscribe(result=>{ alert('Post created successfully!');    this.router.navigate(['']);}, error => {
      alert('Failed to create post. Please try again.');
   

  })
}}
