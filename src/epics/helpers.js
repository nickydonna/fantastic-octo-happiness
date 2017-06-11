// @flow 
/**
 * Spotify Object have a lot more properties
 * We only define the ones we need
 * That is also the reason we transform the objects, we don't want unused properties in our store
 */

import type { Store } from 'redux';
import { getAuthToken as selectAuthToken } from '../reducers/auth';

type SpotifyProfile = {
  birthdate: string,
  country: string,
  display_name: string,
  email: string,
  href: string,
  id: string,
  images: { url: string }[],
};

type SpotifyTrack = {
  id: string,
  name: string,
  preview_url: string,
  popularity: number,
  artists: {
    id: string,
    name: string,
  }[],
};

const formatUser = (response: SpotifyProfile): User => {
  const { id, display_name, email, images } = response;
  return {
    id,
    name: display_name,
    email,
    images: images.map(img => img.url),
  };
};

const formatTrack = ({ id, name, popularity, preview_url, artists}: SpotifyTrack): Track => ({
  id,
  name,
  popularity,
  previewUrl: preview_url,
  artists: artists.map(({ id, name }: { id: string, name: string }) => ({ id, name })),
  liked: false,
});

const getAuthToken = (store: Store<State, GenericAction>) =>
  selectAuthToken(store.getState());

export {
  formatTrack,
  formatUser,
  getAuthToken
};
