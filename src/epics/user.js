// @flow
import { merge } from 'rxjs/observable/merge';
import { combineEpics } from 'redux-observable';

import { userProfile, userTracks } from '../utils/spotify';

import { getAuthToken } from '../reducers/auth';
import { getUser } from '../reducers/user';
import { loadUser } from '../actions/user';
import { loadTracks } from '../actions/track';

type SpotifyProfile = {
  birthdate: string,
  country: string,
  display_name: string,
  email: string,
  href: string,
  id: string,
  images: { url: string }[],
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

const formatTrack = ({ id, name, popularity, preview_url, artists}: any): Track => ({
  id,
  name,
  popularity,
  previewUrl: preview_url,
  artists: artists.map(({ id, name }: { id: string, name: string }) => ({ id, name })),
});

const auth = (action$: rxjs$Observable<GenericAction>, store: Store): rxjs$Observable<GenericAction> => {
  const noProfile$ = action$
    .map(() => store.getState())
    .map(state => [getAuthToken(state), getUser(state)])
    .filter(([authToken, user]) => !!authToken && !user)
    .take(1);

  const loadProfile$ = noProfile$
    .mergeMap(([authToken]: [string]) => userProfile(authToken))
    .map(formatUser)
    .map(loadUser);

  const loadTracks$ = loadProfile$
    .map(() => store.getState())
    .map(state => getAuthToken(state))
    .mergeMap((authToken: string) => userTracks(authToken))
    .map(response => response.items)
    .map(items => items.map(i => formatTrack(i.track)))
    .map(loadTracks);

  return merge(
    loadProfile$,
    loadTracks$,
  );
};

export default combineEpics(
  auth,
);
