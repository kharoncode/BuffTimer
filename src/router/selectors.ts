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

export function getUserSpheres(state: RootState) {
   return getDataGods(state)[getUserGod(state)].spheres.split(' ');
}

export function getUserSpellsList(state: RootState) {
   const userSpellsIdList: string[] = [];
   getUserSpheres(state).map((el: string) => {
      getDataSpheres(state)
         [el].split(' ')
         .map((spell: string) => userSpellsIdList.push(spell));
   });
   const userSpellsList: { [key: string]: { [key: string]: string } } = {};
   userSpellsIdList.map(
      (el) => (userSpellsList[el] = getDataSpells(state)[el])
   );
   return userSpellsList;
}

//store.getState()
export function getDataSpellsStore(store: RootState) {
   return store.getState().data.data.magie.spells;
}
