import styles from './home.module.css';
import { store } from '@/router/store';
import { playersSlice } from '@/pages/players/playersSlice';
import PlayerCard from '@/components/playerCard/PlayerCard';

function Home() {
   const reset = () => {
      store.dispatch(playersSlice.actions.resetPlayers());
   };

   const player = {
      id: 'almir',
      name: 'Almir',
      picture:
         'https://i.pinimg.com/originals/e3/1c/8b/e31c8b19dfc42750ad3655647f074a94.jpg',
      life: {
         currentLife: 157,
         maxLife: 157,
      },
      spells: [
         {
            id: 'benedictionDeKeldar',
            name: 'Bénédiction de Keldar',
            date: null,
         },
         {
            id: 'attaqueSacree',
            name: 'Attaque Sacrée',
            date: null,
         },
         {
            id: 'grandeBenedictionDeKeldar',
            name: 'Grd Bénédiction de Keldar',
            date: null,
         },
         {
            id: 'lameDeJustice',
            name: 'Lame de Justice',
            date: null,
         },
         {
            id: 'transcendance',
            name: 'Transcendance',
            date: null,
         },
         {
            id: 'regenerationMineure',
            name: 'Régénération Mineure',
            date: 1801122802779,
         },
         {
            id: 'resistance',
            name: 'Résistance',
            date: null,
         },
         {
            id: 'salutDuDivin',
            name: 'Salut du Divin',
            date: null,
         },
         {
            id: 'regeneration',
            name: 'Régénération',
            date: null,
         },
         {
            id: 'capriceDuDestin',
            name: 'Caprice du Destin',
            date: 1801122802779,
         },
         {
            id: 'chatiment',
            name: 'Chatiment',
            date: null,
         },
      ],
   };

   return (
      <div className={styles.container}>
         Home
         <PlayerCard data={player} />
         <button onClick={() => reset()}>Reset</button>
      </div>
   );
}

export default Home;
