import styles from './home.module.css';
import { store } from '@/router/store';
import { playersSlice } from '@/pages/players/playersSlice';
import PlayersContainer from '@/components/playersContainer/PlayersContainer';

function Home() {
   const reset = () => {
      store.dispatch(playersSlice.actions.resetPlayers());
   };

   const players = {
      almir: {
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
               category: 'justice',
               date: null,
            },
            {
               id: 'attaqueSacree',
               name: 'Attaque Sacrée',
               category: 'justice',
               date: null,
            },
            {
               id: 'grandeBenedictionDeKeldar',
               name: 'Grd Bénédiction de Keldar',
               category: 'justice',
               date: 1704854679482,
            },
            {
               id: 'lameDeJustice',
               name: 'Lame de Justice',
               category: 'justice',
               date: null,
            },
            {
               id: 'transcendance',
               name: 'Transcendance',
               category: 'justice',
               date: null,
            },
            {
               id: 'regenerationMineure',
               name: 'Régénération Mineure',
               category: 'protection',
               date: 1705566668827,
            },
            {
               id: 'resistance',
               name: 'Résistance',
               category: 'protection',
               date: null,
            },
            {
               id: 'salutDuDivin',
               name: 'Salut du Divin',
               category: 'protection',
               date: null,
            },
            {
               id: 'regeneration',
               name: 'Régénération',
               category: 'protection',
               date: null,
            },
            {
               id: 'capriceDuDestin',
               name: 'Caprice du Destin',
               category: 'protection',
               date: 1705566668827,
            },
            {
               id: 'chatiment',
               name: 'Chatiment',
               category: 'protection',
               date: null,
            },
         ],
      },
   };

   return (
      <div className={styles.container}>
         Home
         <PlayersContainer players={players} />
         <button onClick={() => reset()}>Reset</button>
      </div>
   );
}

export default Home;
