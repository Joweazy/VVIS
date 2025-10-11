import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Observable, map, switchMap } from 'rxjs';
import { Track } from './track';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-yearly-top-100',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './yearly-top-100.component.html',
  styleUrls: ['./yearly-top-100.component.css']
})
export class YearlyTop100Component {
  public cols!: any[];
  public playlist$!: Observable<Track[]>;
  public year!: string;
  public playlistUrl!: string;   

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.route.data.subscribe(data => this.year = data?.['year']);

    this.playlist$ = this.route.data.pipe(
      switchMap((data) => {
        this.year = data?.['year'];
        const playlistId = this.getPlayListId(this.year);
        this.playlistUrl = 'https://open.spotify.com/playlist/' + playlistId;
        
        return this.spotifyService.getPlaylistItems(playlistId).pipe(
          map((result) => {
            return result.items.map((i) => {
              return {
                image: i.track.album.images.slice(-1)[0]?.url,
                name: i.track.name,
                artist: i.track.artists.map((a) => a.name).toString(),
                album: i.track.album.name,
                spotifyUrl: i.track.external_urls.spotify
              };
            });
          })
        );
      })
    );

    this.cols = [
      { field: 'image', header: '', class: 'image-column' },
      { field: 'name', header: 'Title', class: 'title-column' },
      { field: 'artist', header: 'Artist', class: 'artist-column' },
      { field: 'album', header: 'Album', class: 'album-column hide-mobile' }
  ];
  }

  private getPlayListId(year: string): string {
    switch (year) {
      case '2024':
        return '4zNJq6fLT9wObHudnUXN5W';
      case '2023':
        return '18TREgztmjl80F7boO0nIw';
      case '2022':
        return '3cR30uJNzXUMim9xRFVKDp';
      case '2021':
        return '1r3w0SdsjfyG6bLmOXC984';  
      case '2020': 
        return '1WrDWcydM7Ks4SEas578oQ';
      case 'alltime2021':
        return '5TM7IqSbHmtJUqcXHMmuEf'  
      default:
        return '';
    }  
  }

  openSpotifyUrl(url: string): void {
    window.open(url, '_blank');
  }
}

