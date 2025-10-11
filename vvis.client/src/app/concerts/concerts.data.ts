export interface Concert {
  artist: string;
  venue: string;
  date: string;
}

export const CONCERTS_RAW: Concert[] = [
  { artist: 'These New Puritans', venue: 'Bitterzoet', date: '2025-11-03' },
  { artist: 'Milan W.', venue: 'Cinetol', date: '2025-06-02' },
  { artist: 'Brian Jonestown Massacre', venue: 'Melkweg', date: '2025-05-21' },
  { artist: 'Karel', venue: 'Paradiso', date: '2025-01-11' },
  { artist: 'Discovery Zone', venue: 'Cinetol', date: '2024-11-09' },
  { artist: 'Interpol (Antics Tour)', venue: 'Paradiso', date: '2024-10-29' },
  { artist: 'John Maus', venue: 'Paradiso', date: '2024-10-01' },
  { artist: 'Amen Dunes', venue: 'Paradiso', date: '2024-07-07' },
  { artist: 'Ambassade', venue: 'De School', date: '2023-05-25' },
  { artist: 'Bar Italia', venue: 'Cinetol', date: '2023-05-20' },
  { artist: 'Febueder', venue: 'Cinetol', date: '2023-03-23' },
  { artist: 'Courtney Barnett', venue: 'Paradiso', date: '2022-11-03' },
  { artist: 'Brian Jonestown Massacre', venue: 'Paradiso', date: '2022-10-12' },
  { artist: 'Boy Harsher', venue: 'Melkweg', date: '2022-08-25' },
  { artist: 'Reymour', venue: 'Garage Noord', date: '2022-07-07' },
  { artist: 'Kedr Livanskiy', venue: 'Garage Noord', date: '2019-11-22' },
  { artist: 'Art Feynman', venue: 'De School', date: '2018-11-08' },
  { artist: 'Mauskovic Dance Band', venue: 'Sugar Factory', date: '2018-10-17' },
];
