import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post-service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Auth } from '../../auth/auth';
import { User } from '../../auth/user';

@Component({
  selector: 'app-index',
  imports: [RouterModule],
  templateUrl: './index.html',
  styleUrl: './index.css' // Keeping your preference
})
export class Index {
  posts: Post[] = [];
  user: User | undefined;
  username: string | undefined = '';

  constructor(
    private postService: PostService,
    private AuthService: Auth,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('Index component initialized');

    this.postService.getPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log('Posts fetched:', this.posts);
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });

    this.AuthService.getUser().subscribe({
      next: (userData: User) => {
        this.user = userData;
        this.username = this.user.name;
        console.log('Logged-in user:', this.user);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  logout() {
    this.AuthService.UserLogout();
    this.router.navigate(['/login']);
  }
}
