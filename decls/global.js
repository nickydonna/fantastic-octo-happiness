
declare type ActionWithMeta<T, J> = {
  type: string,
  payload: T,
  meta: J,
  error?: boolean,
};

declare type Action<T> = ActionWithMeta<T, void>;
declare type GenericAction = ActionWithMeta<any, any>;

declare type AuthState = {
  authToken?: string,
};

declare type State = {
  auth: AuthState,
};