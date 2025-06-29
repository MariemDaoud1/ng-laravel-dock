import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post-service';  
import { Post } from '../post';

@Component({
  selector: 'app-show',
  imports: [RouterModule,FormsModule],
  templateUrl: './show.html',
  styleUrl: './show.css'
})
export class Show {

  title='';
  description='';
  id:number=0;
  posts:Post[]=[];
  image="";

  constructor(private postService: PostService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() :void{
      this.id = this.route.snapshot.params['postId'];
      this.postService.findPostById(Number(this.id)).subscribe((post: Post) => {
        this.title = post.Title;
        this.description = post.description;
        this.image= post.image ?? ''; // Assuming the Post model has an 'image' property
      });
    }

    deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        alert('Post deleted successfully!');
        this.router.navigate(['post']);
      }, error => {
        alert('Failed to delete post. Please try again.');
      });
    }
  }

}
