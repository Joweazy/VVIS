import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { switchMap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Don't intercept Spotify OAuth token requests or our backend token endpoint
    if (req.url === 'https://accounts.spotify.com/api/token' || req.url.includes('/api/spotifyauth/token')) {
        return next.handle(req);
    }

    const authToken = this.auth.getAccessTokenFromStorage();
    
    
    // Auto-refresh token if not available
    if (!authToken) {
        return this.auth.getClientCredentialsToken().pipe(
            switchMap(result => {
                const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + result.access_token } });
                return next.handle(authReq);
            })
        );
    }

    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
    return next.handle(authReq);
  }
}
