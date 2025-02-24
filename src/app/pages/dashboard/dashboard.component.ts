import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private postService: PostService,
    public router:Router,
    private authService: AuthService) {}

  ngOnInit():void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  viewPostDetails(postId: number) {
    this.router.navigate(['/post', postId]);
  }

  routeTocreatePosts() {
    this.router.navigate(['/create-post']); 
  }
  
  logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
  }
}


