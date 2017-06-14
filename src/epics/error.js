// @flow
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';

import 'rxjs/add/operator/delay';

import { error } from '../actions/error';
import { logout } from '../actions/auth';

const ERROR = error.toString();

type Response = {
  statusCode: number,
};

type ResponseAction = Action<{ response: Response }>;

const isHttpError = ({ payload }: any) => payload.response;
const isUnauthorized = ({ payload }: ResponseAction) => payload.response.statusCode === 401;

const onError = (action$: rxjs$Observable<GenericAction>, store: Store<State, GenericAction>): rxjs$Observable<GenericAction> => {
  const httpErrors$ = action$
    .filter(({ type }) => type === ERROR)
    .filter(isHttpError);

  const logout$ = httpErrors$
    .filter(isUnauthorized)
    .do(() => window.location.reload())
    .mapTo(logout());


  return logout$;
};

export default combineEpics(
  onError,
);
