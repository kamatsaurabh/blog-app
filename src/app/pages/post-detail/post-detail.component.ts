import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  post: any;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private router: Router) {}

  backToDashboard() {
    this.router.navigate(['/dashboard']); // ✅ Navigate to dashboard
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(id).subscribe(data => {
      this.post = data;
    });
  }
}
