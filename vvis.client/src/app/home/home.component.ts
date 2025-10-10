import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnDestroy {
  public loggedIn: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { 
  }
  
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // public getCode(): void {
  //   this.authenticationService.redirectToAuthCodeFlow();
  // }

  // public getToken(): void {
  //   this.authenticationService.getAuthCodeAccessToken().pipe(takeUntil(this.destroy$)).subscribe(token => {
  //     if (token) {
  //       this.loggedIn = true;
  //     }
  //   });
  // }

  public viewPlaylist(): void {
    this.router.navigate(['/vvis']);
  }
}
