import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigEnum } from '../Enum/config.enum';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.Url}${ConfigEnum.Auth}`;
  private user: SocialUser | null = null;

  constructor(private authService: SocialAuthService, private http: HttpClient) {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  public googleLogin(): Observable<any> {
    return new Observable(observer => {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
        this.http.post(`${this.baseUrl}${ConfigEnum.GoogleLogin}`, { token: user.idToken }).subscribe((response:any) => {
          localStorage.setItem(ConfigEnum.JWT, response[ConfigEnum.AccessToken]);
          observer.next(response);
        });
      });
    });
  }

  public facebookLogin(): Observable<any> {
    return new Observable(observer => {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
        this.http.post(`${this.baseUrl}${ConfigEnum.FacebookLogin}`, { token: user.authToken }).subscribe((response:any) => {
          localStorage.setItem(ConfigEnum.JWT, response[ConfigEnum.AccessToken]);
          observer.next(response);
        });
      });
    });
  }

  public logout(): void {
    this.authService.signOut();
    localStorage.removeItem(ConfigEnum.JWT);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(ConfigEnum.JWT);
  }
}
