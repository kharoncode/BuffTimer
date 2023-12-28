import { useDispatch } from 'react-redux';
import { fetchPlayers } from './playersSlice';
import { AppDispatch } from '@/router/store';

function Players() {
   const dispatch = useDispatch<AppDispatch>();
   dispatch(fetchPlayers());
   return <div>General</div>;
}

export default Players;
