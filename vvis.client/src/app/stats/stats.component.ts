import { CommonModule, KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Album, Item, Track } from '../models/playlist';
import { SpotifyService } from '../services/spotify.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  public vvisPlaylistItems$: Observable<Item[]>;
  public albumColumns: any[];
  public addedByGroups: { [id: string]: number; } = {};
  public artistGroups: { [name: string]: number; } = {};
  public topAlbums!: any[];

  constructor(private spotifyService: SpotifyService) {
    this.vvisPlaylistItems$ = this.spotifyService.vvisPlaylist$.pipe(
      tap((items) => {
        this.addedByGroups = this.getAddedByGroups(items);  
        this.artistGroups = this.getArtistGroups(items.map(i => i.track));

        const albumGroups = this.getAlbumGroups(items.map(i => i.track));
        this.topAlbums = Object.values(albumGroups)
          .sort((a, b) => b.count - a.count)
          .slice(0, 20)
          .map((i) => {
            return {
              image: i.album.images.slice(-1)[0]?.url,
              name: i.album.name,
              artist: i.album.artists.map((a) => a.name),
              count: i.count
            };
          });
      })
    );

    this.albumColumns = [
      { field: 'image', header: '', class: 'image-column' },
      { field: 'name', header: 'Title', class: 'title-column' },
      { field: 'artist', header: 'Artist', class: 'artist-column' },
      { field: 'count', header: 'Count', class: 'count-column' }
    ];
  }

  public valueAscOrder = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return a.value > b.value ? -1 : (b.value > a.value ? 1 : 0);
  }

  private getAddedByGroups(items: Item[]) {
    return items.map(i => i.added_by).reduce((p: { [id: string]: number }, current) => {
      var id = current.id;
      if (!p.hasOwnProperty(id)) {
        p[id] = 0;
      }
      p[id]++;
      return p;
    }, {});
  }

  private getArtistGroups(tracks: Track[]) {
    return tracks.map(i => i.artists).flat().reduce((p: { [name: string]: number }, current) => {
      var name = current.name;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});
  }

  private getAlbumGroups(tracks: Track[]) {
    return tracks.map(i => i.album).reduce((p: { [name: string]: { album: Album, count: number} }, current) => {
      var name = current.name;
      if (!p.hasOwnProperty(name)) {
        p[name] = { album: current, count: 0 };
      }
      p[name].count++;
      return p;
    }, {});
  }
}