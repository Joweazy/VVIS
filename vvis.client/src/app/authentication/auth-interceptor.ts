import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { switchMap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === 'https://accounts.spotify.com/api/token') {
        return next.handle(req);
    }

    const authToken = this.auth.getAccessTokenFromStorage();
    
    // // todo refresh token! store expire date?
    // if (!authToken) {
    //     return this.auth.getAccessToken().pipe(
    //         switchMap(newToken => {
    //             const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + newToken } });
    //             return next.handle(authReq);
    //         })
    //     );
    // }

    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
    return next.handle(authReq);
  }
}