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
  uploadPostId: number | null=null;
  selectedFile: File | null=null;
  posts: Post[] = [];
  uploadedImagePath: any;

  constructor(private postService: PostService, private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
  this.error = '';

  if (!this.title || !this.description) {
    this.error = 'Title and description are required!';
    return;
  }

  const input = {
    Title: this.title,
    description: this.description,
    image: ''
  };

  this.postService.createPosts(input).subscribe(
    result => {
      const postId = result?.id;

      if (!postId) {
        this.error = 'Post created but no ID returned.';
        return;
      }

      // ✅ If file selected, upload it now
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('id', postId.toString());

        this.postService.uploadImage(formData).subscribe(
          (response) => {
            alert('Post created successfully with image!');
            this.router.navigate(['post']);
          },
          (error) => {
            console.error('Image upload failed:', error);
            alert('Post created, but image upload failed.');
            this.router.navigate(['post']);
          }
        );
      } else {
        alert('Post created successfully!');
        this.router.navigate(['post']);
      }
    },
    error => {
      if (error.status === 422 && error.error?.errors) {
        const messages = Object.values(error.error.errors).flat().join('\n');
        this.error = 'Validation failed:\n' + messages;
      } else {
        this.error = 'Failed to create post. Please try again.';
      }
    }
  );
}
}