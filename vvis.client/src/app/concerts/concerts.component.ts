import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Concert, CONCERTS_RAW } from './concerts.data';

export interface ConcertWithStatus extends Concert {
  isPast: boolean;
}

@Component({
  selector: 'app-concerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concerts.component.html',
  styleUrl: './concerts.component.css'
})
export class ConcertsComponent implements OnInit {
  upcomingConcerts: ConcertWithStatus[] = [];
  pastConcerts: ConcertWithStatus[] = [];
  totalConcerts: number = 0;

  ngOnInit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    const concertsWithStatus: ConcertWithStatus[] = CONCERTS_RAW.map(concert => ({
      ...concert,
      isPast: new Date(concert.date) < today
    }));

    this.upcomingConcerts = concertsWithStatus.filter(c => !c.isPast);
    this.pastConcerts = concertsWithStatus.filter(c => c.isPast);
    this.totalConcerts = concertsWithStatus.length;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
