import { RootState } from './store';

// useSelector
// login
export function getLogin(state: RootState) {
   return state?.login;
}

export const getAuth = (state: RootState) => {
   return getLogin(state).auth;
};

// players
export function getPlayers(state: RootState) {
   return state?.players;
}

export function getPlayersList(state: RootState) {
   return getPlayers(state).players;
}

// profile
export function getProfile(state: RootState) {
   return getLogin(state).profile;
}

export function getFavoris(state: RootState) {
   return getProfile(state).favoris;
}

export function getIntelligence(state: RootState) {
   return parseInt(getProfile(state).intelligence);
}

export function getUserGod(state: RootState) {
   return getProfile(state).god;
}

// data
export function getData(state: RootState) {
   return state?.data.data;
}

export function getDataMagie(state: RootState) {
   return getData(state).magie;
}

export function getDataSpells(state: RootState) {
   return getDataMagie(state).spells;
}

export function getDataGods(state: RootState) {
   return getDataMagie(state).gods;
}

export function getDataSpheres(state: RootState) {
   return getDataMagie(state).spheres;
}

//store.getState()
export function getDataSpellsStore(store: RootState) {
   return store.getState().data.data.magie.spells;
}
