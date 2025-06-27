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
  selectedFile: File | null = null;
  uploadPostId: number | null = null; // Tracks the post ID for the upload
  

  constructor(private postService: PostService, private http: HttpClient, private router: Router){}

  ngOnInit(){
    this.postService.getPosts().subscribe((data:Post[])=>{
      this.posts = data;
    });
    }
    
    onFileSelected(event: Event,postId: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files?.length) {
      this.selectedFile = input.files[0];
      this.uploadPostId=postId;
    }
  }
  onSubmit() {
    if (!this.selectedFile || this.uploadPostId === null) {
      alert('Please select a file and a post to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('id', this.uploadPostId.toString());

    this.postService.uploadImage(formData).subscribe(
      (response) => {
        const updatedPost = this.posts.find(p => p.id === this.uploadPostId);
        if (updatedPost && response?.data?.image_url) {
        updatedPost.image = response.data.image_url;
        }
        this.selectedFile = null; // Reset the selected file
        this.uploadPostId = null; // Reset the post ID
        this.router.navigate(['post']);
        alert('Image uploaded successfully!');
      },
      (error) => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    );
  }
  
}