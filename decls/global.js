
declare type ActionWithMeta<T, J> = {
  type: string,
  payload: T,
  meta: J,
  error?: boolean,
};

declare type Action<T> = ActionWithMeta<T, void>;
declare type GenericAction = ActionWithMeta<any, any>;

declare type User = {
  id: string,
  name: string,
  email: string,
  images: string[]
};

declare type Artist = {
  id: string,
  name: string,
};

declare type Track = {
  id: string,
  name: string,
  popularity: number,
  previewUrl: string,
  artists: Artist[],
}

declare type AuthState = {
  authToken?: string,
};

declare type UserState = {
  user?: User,
};

declare type TrackState = {
  tracks: Track[],
};

declare type State = {
  auth: AuthState,
  user: UserState,
  track: TrackState,
};