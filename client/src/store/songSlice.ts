import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, Statistics } from '../types/song';

interface SongState {
  songs: Song[];
  statistics: Statistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  statistics: null,
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      state.loading = false;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(song => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter(song => song._id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchStatisticsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess(state, action: PayloadAction<Statistics>) {
      state.statistics = action.payload;
      state.loading = false;
    },
    fetchStatisticsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    fetchSongsStart,
    fetchSongsSuccess,
    fetchSongsFailure,
    addSongStart,
    addSongSuccess,
    addSongFailure,
    updateSongStart,
    updateSongSuccess,
    updateSongFailure,
    deleteSongStart,
    deleteSongSuccess,
    deleteSongFailure,
    fetchStatisticsStart,
    fetchStatisticsSuccess,
    fetchStatisticsFailure,
  } = songSlice.actions;
  
  export default songSlice.reducer;