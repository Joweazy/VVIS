import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Observable, map, shareReplay } from 'rxjs';

import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-vvis-home',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './vvis-home.component.html',
  styleUrls: ['./vvis-home.component.css']
})
export class VvisHomeComponent implements OnInit {
  public cols!: any[];
  public vvisPlaylist$: Observable<Playlist>
  public vvisTracks$: Observable<any[]>; // todo type
  public loadPercentage$: Observable<number>;

  private readonly vvisId = '64ObqvLOx3QAD7ULcV7yAa';
  public playlistUrl = 'https://open.spotify.com/playlist/' + this.vvisId;

  constructor(private spotifyService: SpotifyService) {
    this.vvisPlaylist$ = this.spotifyService.getPlaylist(this.vvisId).pipe(shareReplay(1));

    this.loadPercentage$ = this.spotifyService.loadPercentage$.asObservable();
    this.vvisTracks$ = this.spotifyService.vvisPlaylist$
      .pipe(
        map(x => x.map(i => {
          return {
            image: i.track.album.images.slice(-1)[0]?.url,
            name: i.track.name,
            artist: i.track.artists.map(a => a.name),
            album: i.track.album.name,
            addedBy: i.added_by.id == '1194351423' ? 'Joey' : i.added_by.id,
            //addedAt: new Date(i.added_at).toLocaleDateString(),
            addedAt: i.added_at
            //popularity: i.track.popularity
          }
        }))
      )
  }

  ngOnInit() {

    this.cols = [
      { field: 'image' },
      { field: 'name', header: 'Title' },
      { field: 'artist', header: 'Artist' },
      { field: 'album', header: 'Album' },
      //{ field: 'popularity', header: 'Popularity' },
      { field: 'addedBy', header: 'Added by' },
      { field: 'addedAt', header: 'Added at' }
    ];
  }
}
