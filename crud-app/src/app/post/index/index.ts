import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [RouterModule],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {
  posts:Post[]=[];
  

  constructor(private postService: PostService){}

  ngOnInit(){
    this.postService.getPosts().subscribe((data:Post[])=>{
      this.posts = data;
    });}
  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        alert('Post deleted successfully!');
      }, error => {
        alert('Failed to delete post. Please try again.');
      });
  }
  }}