import { NgModule, provideZoneChangeDetection, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';

@NgModule({
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Set to true if you want auto-login
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1052149523397-o5o0nn1gj9m9le52189q68geqo73veoi.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1296177931495483'),
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    CommonModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }