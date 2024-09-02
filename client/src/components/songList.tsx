import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { space, typography, layout, SpaceProps, TypographyProps, LayoutProps } from 'styled-system';
import { RootState } from '../store';
import { fetchSongsStart, deleteSongStart } from '../store/songSlice';
import { Song } from '../types/song';


const Table = styled.table<SpaceProps & LayoutProps>`
  ${space}
  ${layout}
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th<TypographyProps & SpaceProps>`
  ${typography}
  ${space}
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td<TypographyProps & SpaceProps>`
  ${typography}
  ${space}
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button<SpaceProps & TypographyProps>`
  ${space}
  ${typography}
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
`;

export const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteSongStart(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Table mt={4}>
      <thead>
        <tr>
          <Th p={2}>Title</Th>
          <Th p={2}>Artist</Th>
          <Th p={2}>Album</Th>
          <Th p={2}>Genre</Th>
          <Th p={2}>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song: Song) => (
          <tr key={song._id}>
            <Td p={2}>{song.title}</Td>
            <Td p={2}>{song.artist}</Td>
            <Td p={2}>{song.album}</Td>
            <Td p={2}>{song.genre}</Td>
            <Td p={2}>
              <Button mr={2} onClick={() => handleDelete(song._id)}>Delete</Button>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
