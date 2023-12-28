import { store } from '@/router/store';
import { playersSlice } from '../players/playersSlice';

function Home() {
   const reset = () => {
      store.dispatch(playersSlice.actions.resetPlayers());
   };

   return (
      <div>
         Home
         <button onClick={() => reset()}>Reset</button>
      </div>
   );
}

export default Home;
