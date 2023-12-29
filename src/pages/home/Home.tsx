import styles from './home.module.css';
import { store } from '@/router/store';
import { playersSlice } from '../players/playersSlice';

function Home() {
   const reset = () => {
      store.dispatch(playersSlice.actions.resetPlayers());
   };

   return (
      <div className={styles.container}>
         Home
         <button onClick={() => reset()}>Reset</button>
      </div>
   );
}

export default Home;
