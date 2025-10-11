import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, expand, reduce, shareReplay, tap, switchMap, forkJoin, map, of } from 'rxjs';
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
    this.vvisPlaylist$ = this.getPlaylistItemsParallel(this.vvisId).pipe(
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

  /**
   * Fetches all playlist items in parallel for better performance.
   * First fetches one page to get the total count, then makes parallel requests for remaining pages.
   */
  private getPlaylistItemsParallel(id: string, limit: number = 100): Observable<Item[]> {
    // First, get the first page to know the total count
    return this.getPlaylistItems(id, 0, limit).pipe(
      switchMap((firstPage: Tracks) => {
        const total = firstPage.total;
        const items = [...firstPage.items];
        
        // If all items fit in first page, return them
        if (total <= limit) {
          this.loadPercentage$.next(100);
          return of(items);
        }

        // Calculate how many additional requests we need
        const numberOfPages = Math.ceil(total / limit);
        const requests: Observable<Tracks>[] = [];
        
        // Create parallel requests for remaining pages
        for (let i = 1; i < numberOfPages; i++) {
          const offset = i * limit;
          requests.push(this.getPlaylistItems(id, offset, limit));
        }

        // Execute all requests in parallel and combine results
        return forkJoin(requests).pipe(
          map((responses: Tracks[]) => {
            // Track progress as requests complete
            let loadedItems = firstPage.items.length;
            responses.forEach(response => {
              items.push(...response.items);
              loadedItems += response.items.length;
              this.loadPercentage$.next((loadedItems / total) * 100);
            });
            return items;
          })
        );
      })
    );
  }

  /**
   * Legacy sequential method - kept for reference or fallback.
   * This is slower but more conservative on API rate limits.
   */
  public getPlaylistItemsSequential(id: string): Observable<Item[]> {
    return this.getPlaylistItems(id).pipe(
      expand((data: Tracks) => data.next === null ? EMPTY : this.getPlaylistItemsByUrl(data.next)),
      tap(tracks => {
        this.loadPercentage$.next((tracks.offset / tracks.total) * 100);
      }),
      reduce((acc: Item[], val: Tracks) => {
        acc = [...acc, ...val.items]
        return acc;
      }, [])
    );
  }

  //get User Top items
  //https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  //danceability
  //https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
}
