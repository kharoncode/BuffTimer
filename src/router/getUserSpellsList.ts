import { store } from './store';

const getUserSpellsList = () => {
   const userSpellsIdList: string[] = [];
   const userSpellsList: { [key: string]: { [key: string]: string } } = {};
   const dataGods = store.getState().data.data.magie.gods;
   const dataSpheres = store.getState().data.data.magie.spheres;
   const dataSpells = store.getState().data.data.magie.spells;
   const userGod = store.getState().login.profile.god;
   const userSpheres = dataGods[userGod].spheres.split(' ');

   userSpheres.map((el: string) => {
      dataSpheres[el]
         .split(' ')
         .map((spell: string) => userSpellsIdList.push(spell));
   });

   userSpellsIdList.map((el) => (userSpellsList[el] = dataSpells[el]));

   return userSpellsList;
};

export default getUserSpellsList;
