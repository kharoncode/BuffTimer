import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers } from './playersSlice';
import { AppDispatch } from '@/router/store';
import { getPlayers } from '@/router/selectors';
import type { player } from '@/utils/formatPlayer';

function Players() {
   const dispatch = useDispatch<AppDispatch>();
   const { loading, players, error } = useSelector(getPlayers);
   if (error === null && players.length === 0) {
      dispatch(fetchPlayers());
   }

   return error ? (
      <div>Error : {error}</div>
   ) : loading ? (
      <div>Loading ...</div>
   ) : (
      players.map((el: player, index: number) => (
         <div key={index}>{el.name}</div>
      ))
   );
}

export default Players;
