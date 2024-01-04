import formatFavoris from '@/utils/formatFavoris';
import { RootState } from './store';

export function getLogin(state: RootState) {
   return state?.login;
}

export const getAuth = (state: RootState) => {
   return getLogin(state).auth;
};

export function getPlayers(state: RootState) {
   return state?.players;
}

export function getProfile(state: RootState) {
   return getLogin(state).profile;
}

export function getFavoris(state: RootState) {
   const favoris = getProfile(state).favoris;
   const players = getPlayers(state).players;
   return formatFavoris(favoris, players);
}

export function getIntelligence(state: RootState) {
   return parseInt(getProfile(state).intelligence);
}
