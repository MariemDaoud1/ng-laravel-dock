import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-index',
  imports: [RouterModule,FormsModule],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {
  posts:Post[]=[];

constructor(private postService: PostService, private http: HttpClient, private router: Router){}

ngOnInit() {
  console.log('Index component initialized');
  this.postService.getPosts().subscribe(
    (data: Post[]) => {
      this.posts = data; // Assign the fetched posts to the component's posts array
      console.log('Posts fetched:', this.posts); // Log the data for verification
    },
    (error) => {
      console.error('Error fetching posts:', error); // Log any errors
    }
  );
}
  
}