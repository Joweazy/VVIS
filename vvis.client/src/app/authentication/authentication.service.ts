import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AccessTokenResult } from './access-token-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private redirectUri = 'https://localhost:4200';
  private clientId = 'CLIENT_ID';

  constructor(private httpClient: HttpClient) {}

  public getClientCredentialsToken(): Observable<AccessTokenResult> {
    // Call YOUR backend API instead of Spotify directly
    return this.httpClient.post<AccessTokenResult>('/api/spotifyauth/token', {})
      .pipe(
        tap((result) => {
          if (result) {
            window.localStorage.setItem('access_token', result.access_token);
          }
        })
      );
  }

  // More info: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
  public async redirectToAuthCodeFlow() {
    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier);
    const codeChallenge = this.base64encode(hashed);

    //https://developer.spotify.com/documentation/web-api/concepts/scopes
    const scope = 'user-read-private user-read-email playlist-read-private';
    const authUrl = new URL('https://accounts.spotify.com/authorize');

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = {
      response_type: 'code',
      client_id: this.clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: this.redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  // Retrieves access token, which is valid for 1 hour
  public getAuthCodeAccessToken(): Observable<AccessTokenResult> {
    const codeVerifier = window.localStorage.getItem('code_verifier') as string;
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      throw new Error('Code not found!');
    }

    const reqParams = new URLSearchParams();
    reqParams.append('client_id', this.clientId);
    reqParams.append('grant_type', 'authorization_code');
    reqParams.append('code', code!);
    reqParams.append('redirect_uri', this.redirectUri);
    reqParams.append('code_verifier', codeVerifier!);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.httpClient.post<AccessTokenResult>('https://accounts.spotify.com/api/token', reqParams, httpOptions)
      .pipe(
        tap((result) => {
          if (result) {
            window.localStorage.setItem('access_token', result.access_token);
          }
        })
      );
    }

    public getRefreshToken(): Observable<AccessTokenResult> {
      const refreshToken = localStorage.getItem('refresh_token') as string;
  
      const reqParams = new URLSearchParams();
      reqParams.append('client_id', this.clientId);
      reqParams.append('grant_type', 'refresh_token');
      reqParams.append('refresh_token', refreshToken);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      };
  
      return this.httpClient.post<AccessTokenResult>('https://accounts.spotify.com/api/token', reqParams, httpOptions)
        .pipe(
          tap((result) => {
            if (result) {
              window.localStorage.setItem('refresh_token', result.refresh_token);
              window.localStorage.setItem('access_token', result.access_token);
            }
          })
        );
    }

  public getAccessTokenFromStorage(): string | null {
    return window.localStorage.getItem('access_token');
  }

  private generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  }

  private async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  private base64encode(input: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
