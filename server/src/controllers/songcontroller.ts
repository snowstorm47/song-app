import { Request, Response } from 'express';
import Song, { ISong } from '../models/song';

//get song
export const getSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error });
  }
};

//create song
export const createSong = async (req: Request, res: Response) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ message: 'Error creating song', error });
  }
};

//update song
export const updateSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json(song);
  } catch (error) {
    res.status(400).json({ message: 'Error updating song', error });
  }
};


//delete song
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting song', error });
  }
};

//get stats
export const getStatistics = async (req: Request, res: Response) => {
  try {
    const totalSongs = await Song.countDocuments();
    const artistCount = await Song.distinct('artist').countDocuments();
    const albumCount = await Song.distinct('album').countDocuments();
    const genreCount = await Song.distinct('genre').countDocuments();
    
    const genreStats = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } }
    ]);
    
    const artistStats = await Song.aggregate([
      { $group: { _id: '$artist', songCount: { $sum: 1 }, albums: { $addToSet: '$album' } } },
      { $project: { songCount: 1, albumCount: { $size: '$albums' } } }
    ]);

    const albumStats = await Song.aggregate([
      { $group: { _id: '$album', songCount: { $sum: 1 } } }
    ]);

    res.json({
      totalSongs,
      artistCount,
      albumCount,
      genreCount,
      genreStats,
      artistStats,
      albumStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};