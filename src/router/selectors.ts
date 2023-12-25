import { RootState } from './store';

export function getLogin(state: RootState) {
   return state?.login;
}

export const getAuth = (state: RootState) => {
   return getLogin(state).auth;
};
