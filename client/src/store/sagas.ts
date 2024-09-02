import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from './songSlice';
import { Song, SongFormData, Statistics } from '../types/song';
import { PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/api/songs';

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return error instanceof Error ? error.message : String(error);
}

function* fetchSongs() {
  try {
    const response: { data: Song[] } = yield call(axios.get, API_URL);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(getErrorMessage(error)));
  }
}

function* addSong(action: PayloadAction<SongFormData>) {
  try {
    const response: { data: Song } = yield call(axios.post, API_URL, action.payload);
    yield put(addSongSuccess(response.data));
  } catch (error) {
    yield put(addSongFailure(getErrorMessage(error)));
  }
}

function* updateSong(action: PayloadAction<{ id: string; data: SongFormData }>) {
  try {
    const response: { data: Song } = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload.data);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(getErrorMessage(error)));
  }
}

function* deleteSong(action: PayloadAction<string>) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(getErrorMessage(error)));
  }
}

function* fetchStatistics() {
  try {
    const response: { data: Statistics } = yield call(axios.get, `${API_URL}/statistics`);
    yield put(fetchStatisticsSuccess(response.data));
  } catch (error) {
    yield put(fetchStatisticsFailure(getErrorMessage(error)));
  }
}

export function* rootSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongs);
  yield takeLatest(addSongStart.type, addSong);
  yield takeLatest(updateSongStart.type, updateSong);
  yield takeLatest(deleteSongStart.type, deleteSong);
  yield takeLatest(fetchStatisticsStart.type, fetchStatistics);
}