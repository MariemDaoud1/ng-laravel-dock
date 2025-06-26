import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { Post } from '../post';

@Component({
  selector: 'app-edit',
  imports: [RouterModule,FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {
  error="";
  id = '';
  title = '';
  description = '';

  constructor(private postService: PostService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() :void{
    this.id = this.route.snapshot.params['postId'];
    this.postService.findPostById(Number(this.id)).subscribe((post: Post) => {
      this.title = post.Title;
      this.description = post.description;
    });
  }

  submit(){
    if (!this.title || !this.description) {
      this.error = 'Title and description are required!';
      return;
    }
    const input = {
      Title: this.title,
      description: this.description
    }
    this.postService.updatePost(Number(this.id), input).subscribe(result => {
      alert('Post updated successfully!');
      this.router.navigate(['post']);
    }, error => {
      alert('Failed to update post. Please try again.');
      this.error = 'Failed to update post. Please try again.';
   

  })
    
  }

}
