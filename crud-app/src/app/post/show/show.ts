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
  id = '';

  constructor(private postService: PostService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() :void{
      this.id = this.route.snapshot.params['postId'];
      this.postService.findPostById(Number(this.id)).subscribe((post: Post) => {
        this.title = post.Title;
        this.description = post.description;
      });
    }

}
