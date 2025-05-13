import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, expand, reduce, shareReplay, tap } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { Item, Playlist, Tracks } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public vvisPlaylist$!: Observable<Item[]>;
  public loadPercentage$ = new BehaviorSubject<number>(0);
  private baseUrl = 'https://api.spotify.com/v1';
  private readonly vvisId = '64ObqvLOx3QAD7ULcV7yAa';

  constructor(private httpClient: HttpClient) {
    this.vvisPlaylist$ = this.getPlaylistItems(this.vvisId).pipe(
      expand((data: Tracks) => data.next === null ? EMPTY : this.getPlaylistItemsByUrl(data.next)),
      tap(tracks => {
        this.loadPercentage$.next((tracks.offset / tracks.total) * 100);
      }),
      reduce((acc: Item[], val: Tracks) => {
        acc = [...acc, ...val.items]
        return acc;
      }, []),
      shareReplay(1)
    )
   }

  public getCurrentUserProfile(): Observable<UserProfile> {
    const url = this.baseUrl + '/me';
    return this.httpClient.get<UserProfile>(url)
  }

  public getPlaylist(id: string): Observable<Playlist> {
    const url = this.baseUrl + '/playlists/' + id + '?market=NL'; 
    return this.httpClient.get<Playlist>(url)
  }

  public getPlaylistItems(id: string, offset: number = 0, limit: number = 100): Observable<Tracks> {
    const url = `${this.baseUrl}/playlists/${id}/tracks?limit=${limit}&offset=${offset}&market=NL`; 
    return this.httpClient.get<Tracks>(url)
  }

  public getPlaylistItemsByUrl(url: string): Observable<Tracks> {
    return this.httpClient.get<Tracks>(url)
  }

  //get User Top items
  //https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  //danceability
  //https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
}
