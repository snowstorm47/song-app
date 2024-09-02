export interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  }
  
  export interface SongFormData {
    title: string;
    artist: string;
    album: string;
    genre: string;
  }
  
  export interface Statistics {
    totalSongs: number;
    artistCount: number;
    albumCount: number;
    genreCount: number;
    genreStats: { _id: string; count: number }[];
    artistStats: { _id: string; songCount: number; albumCount: number }[];
    albumStats: { _id: string; songCount: number }[];
  }