import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public user$: Observable<UserProfile>

  constructor(private spotifyService: SpotifyService) {
    this.user$ = this.spotifyService.getCurrentUserProfile();
  }


}
