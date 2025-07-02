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
  id :number = 0;
  title = '';
  description = '';
  image = ''; // Assuming the Post model has an 'image' property
  selectedFile: File | null = null;
  uploadPostId: number | null = null;
  posts:Post[]=[];

  constructor(private postService: PostService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() :void{
      this.id = this.route.snapshot.params['postId'];
      this.postService.findPostById(Number(this.id)).subscribe((post: Post) => {
      this.title = post.Title;
      this.description = post.description;
      this.image = post.image ?? ''; // Assuming the Post model has an 'image' property
    });
  }

   onSubmit(){}
  //   if (!this.title || !this.description) {
  //     this.error = 'Title and description are required!';
  //     return;
  //   }
  //   const input = {
  //     Title: this.title,
  //     description: this.description,
  //     image: this.image // Include the image URL if available
  //   }
  //   this.postService.updatePost(Number(this.id), input).subscribe(result => {
  //     alert('Post updated successfully!');
  //     this.router.navigate(['post']);
  //   }, error => {
  //     alert('Failed to update post. Please try again.');
  //     this.error = 'Failed to update post. Please try again.';
   

  // })
    
  // }

   onFileSelected(event: Event,postId: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files?.length) {
      this.selectedFile = input.files[0];
      this.uploadPostId=postId;
    }
  }


  submit() {
  this.error = '';

  // Step 1: Validate title & description
  if (!this.title || !this.description) {
    this.error = 'Title and description are required!';
    return;
  }

  // Step 2: Update post data (title, description, image)
  const input = {
    Title: this.title,
    description: this.description,
    image: this.image
  };

  this.postService.updatePost(Number(this.id), input).subscribe(result => {
    alert('Post updated successfully!');
    this.router.navigate(['post']);
  }, error => {
    alert('Failed to update post. Please try again.');
    this.error = 'Failed to update post. Please try again.';
  });

  // Step 3: Upload image if selected
  if (this.selectedFile && this.uploadPostId !== null) {
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('id', this.uploadPostId.toString());

    this.postService.uploadImage(formData).subscribe(
      (response) => {
        const updatedPost = this.posts.find(p => p.id === this.uploadPostId);
        if (updatedPost && response?.data?.image_url) {
          updatedPost.image = response.data.image_url;
        }
        this.selectedFile = null;
        this.uploadPostId = null;
        window.location.reload();
        alert('Image uploaded successfully!');
      },
      (error) => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    );
  }
}

  

}
