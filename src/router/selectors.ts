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

export function getPlayersList(state: RootState) {
   return getPlayers(state).players;
}

export function getProfile(state: RootState) {
   return getLogin(state).profile;
}

export function getFavoris(state: RootState) {
   return getProfile(state).favoris;
}

export function getIntelligence(state: RootState) {
   return parseInt(getProfile(state).intelligence);
}

export function getData(state: RootState) {
   return state?.data.data;
}

export function getMagie(state: RootState) {
   return getData(state).magie;
}

export function getSpells(state: RootState) {
   return getMagie(state).spells;
}
