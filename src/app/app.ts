import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { env } from '../envs/env';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'todo-frontend';

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: env.cognito.UserPoolId,
          userPoolClientId: env.cognito.ClientId,
          identityPoolId: '<your-cognito-identity-pool-id>',
          loginWith: {
            email: true,
            // oauth: {
            //   domain: env.cognito.domain,
            //   scopes: [
            //     'openid',
            //     'email',
            //     'phone',
            //     'profile',
            //     'aws.cognito.signin.user.admin',
            //   ],
            //   redirectSignIn: ['https://findout.lk/', 'http://localhost:8083/'],
            //   redirectSignOut: [
            //     'https://findout.lk/',
            //     'http://localhost:8083/',
            //   ],
            //   responseType: 'code',
            // },
          },
          signUpVerificationMethod: 'code',
          userAttributes: {
            email: {
              required: true,
            },
          },
          allowGuestAccess: true,
          passwordFormat: {
            minLength: 8,
            requireLowercase: true,
            requireUppercase: true,
            requireNumbers: true,
            requireSpecialCharacters: true,
          },
        },
      },
    });
  }
}
