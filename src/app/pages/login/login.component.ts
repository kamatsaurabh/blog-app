import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigEnum } from '../../Enum/config.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService,public router:Router) {}

  public loginWithGoogle():void {
    this.authService.googleLogin().subscribe(response => {
      if(response){
        this.routeToDashboard();
      }
    });
  }

  public loginWithFacebook():void {
    this.authService.facebookLogin().subscribe(response => {
      if(response){
        this.routeToDashboard();
      }
    });
  }

  public routeToDashboard():void {
    this.router.navigate([ConfigEnum.Dashboard]);
  }
}
