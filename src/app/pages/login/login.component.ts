import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginWithGoogle() {
    this.authService.googleLogin().subscribe(response => {
      if(response){
        console.log('Facebook login success:', response);
      }
    });
  }

  loginWithFacebook() {
    this.authService.facebookLogin().subscribe(response => {
      if(response){
        console.log('Facebook login success:', response);
      }
    });
  }
}
