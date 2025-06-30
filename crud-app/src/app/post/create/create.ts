import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { Post } from '../post';

@Component({
  selector: 'app-create',
  imports: [RouterModule, FormsModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']   // <== fix here: styleUrls (plural), not styleUrl
})
export class Create {
  title = '';
  id: number = 0; // Initialize id to 0
  description = '';
  image = ''; // Assuming the Post model has an 'image' property
  error = "";
  uploadPostId: number | undefined;
  selectedFile: File | undefined;
  posts: Post[] = [];
  uploadedImagePath: any;

  constructor(private postService: PostService, private router: Router) {}

  onFileSelected(event: Event, postId: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.uploadPostId = postId;
    }
  }

  onSubmit() {}
  //   if (!this.selectedFile) {
  //     alert('Please select a file first.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('image', this.selectedFile);

  //   this.postService.uploadImage(formData).subscribe({
  //     next: (response) => {
  //       // Save the image path from server response
  //       this.uploadedImagePath = response.data?.image_url || null;
  //       alert('Image uploaded successfully!');
  //       // Optionally auto-call submit() here or let user trigger it
  //     },
  //     error: (error) => {
  //       alert('Failed to upload image.');
  //       console.error(error);
  //     }
  //   });
  // }


  submit() {
    if (!this.title || !this.description) {
      this.error = 'Title and description are required!';
      return;
    }
    const input = {
      Title: this.title,  // keep as 'Title' if Laravel expects uppercase
      description: this.description,
      image: this.uploadedImagePath || '' // Use the uploaded image path if available 
    };
    this.postService.createPosts(input).subscribe(
      result => {
        alert('Post created successfully!');
        this.router.navigate(['post']);
      },
      error => {
        if (error.status === 422 && error.error?.errors) {
          // Flatten validation messages into a single string separated by new lines
          const messages = Object.values(error.error.errors)
            .flat()
            .join('\n');
          this.error = 'Validation failed:\n' + messages;
        } else {
          this.error = 'Failed to create post. Please try again.';
        }
      }
    );
  }
}
