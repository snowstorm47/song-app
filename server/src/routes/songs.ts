import express from 'express';
import { getSongs, createSong, updateSong, deleteSong, getStatistics } from './../controllers/songcontroller';

const router = express.Router();

router.get('/', getSongs);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.get('/statistics', getStatistics);

export default router;