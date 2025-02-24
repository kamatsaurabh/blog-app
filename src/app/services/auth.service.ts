import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private user: SocialUser | null = null;

  constructor(private authService: SocialAuthService, private http: HttpClient) {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  googleLogin(): Observable<any> {
    return new Observable(observer => {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
        this.http.post(`${this.baseUrl}/google-login`, { token: user.idToken }).subscribe((response:any) => {
          localStorage.setItem('jwt', response['accessToken']);
          observer.next(response);
        });
      });
    });
  }

  facebookLogin(): Observable<any> {
    return new Observable(observer => {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
        this.http.post(`${this.baseUrl}/facebook-login`, { token: user.authToken }).subscribe((response:any) => {
          localStorage.setItem('jwt', response['accessToken']);
          observer.next(response);
        });
      });
    });
  }

  logout(): void {
    this.authService.signOut();
    localStorage.removeItem('jwt');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
