import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
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
  @ViewChild('dt') table!: Table;
  
  public cols!: any[];
  public vvisPlaylist$: Observable<Playlist>
  public vvisTracks$: Observable<any[]>; // todo type
  public loadPercentage$: Observable<number>;
  public dateSortOrder: number = 1; // -1 for descending (newest first), 1 for ascending

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
            addedAt: new Date(i.added_at),
            spotifyUrl: i.track.external_urls.spotify,
            releaseDate: i.track.album.release_date,
            popularity: i.track.popularity
          }
        }))
      )
  }

  ngOnInit() {

    this.cols = [
      { field: 'image', header: '', class: 'image-column' },
      { field: 'name', header: 'Title', class: 'title-column' },
      { field: 'artist', header: 'Artist', class: 'artist-column' },
      { field: 'album', header: 'Album', class: 'album-column hide-mobile' },
      //{ field: 'popularity', header: 'Popularity' },
      { field: 'addedBy', header: 'Added by', class: 'added-by-column hide-tablet' },
      { field: 'addedAt', header: 'Added at', class: 'added-at-column hide-tablet' }
    ];
  }

  openSpotifyUrl(url: string): void {
    window.open(url, '_blank');
  }

  exportToCSV(tracks: any[]): void {
    // Prepare CSV headers
    const headers = ['Title', 'Artist', 'Album', 'Added By', 'Added At', 'Spotify URL'];
    
    // Prepare CSV rows
    const csvRows = tracks.map(track => [
      this.escapeCSV(track.name),
      this.escapeCSV(Array.isArray(track.artist) ? track.artist.join(', ') : track.artist),
      this.escapeCSV(track.album),
      this.escapeCSV(track.addedBy),
      track.addedAt.toLocaleDateString('nl-NL'),
      track.spotifyUrl
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // Create and download the file
    this.downloadFile(csvContent, 'vvis-playlist.csv', 'text/csv');
  }

  exportToJSON(tracks: any[]): void {
    // Prepare data for JSON export
    const jsonData = tracks.map(track => ({
      title: track.name,
      artist: Array.isArray(track.artist) ? track.artist : [track.artist],
      album: track.album,
      addedBy: track.addedBy,
      addedAt: track.addedAt.toISOString(),
      popularity: track.popularity,
      releaseDate: track.releaseDate
    }));

    const jsonContent = JSON.stringify(jsonData, null, 2);
    this.downloadFile(jsonContent, 'vvis-playlist.json', 'application/json');
  }

  private escapeCSV(value: string): string {
    if (value == null) return '';
    const stringValue = String(value);
    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return '"' + stringValue.replace(/"/g, '""') + '"';
    }
    return stringValue;
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  toggleDateSort(): void {
    // Toggle between ascending (1) and descending (-1)
    this.dateSortOrder = this.dateSortOrder === 1 ? -1 : 1;
    
    // Apply sort to the table
    if (this.table) {
      this.table.sortField = 'addedAt';
      this.table.sortOrder = this.dateSortOrder;
      this.table.sortSingle();
    }
  }
}
