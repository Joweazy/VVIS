import { Component, OnDestroy } from '@angular/core';
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

  constructor(private authenticationService: AuthenticationService) { 
  }
  
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getCode(): void {
    this.authenticationService.redirectToAuthCodeFlow();
  }

  public getToken(): void {
    this.authenticationService.getAccessToken().pipe(takeUntil(this.destroy$)).subscribe(token => {
      if (token) {
        this.loggedIn = true;
      }
    });
  }
}
