import PlayerCard from '@/components/playerCard/PlayerCard';
import { getPlayers, getProfile } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { playersState } from '../players/playersSlice';

function Profile() {
   const profile = useSelector(getProfile);
   const { loading, players, error }: playersState = useSelector(getPlayers);
   return (
      <div>
         Hello {profile.name}
         {error ? (
            <div>Error : {error}</div>
         ) : loading ? (
            <div>Loading ...</div>
         ) : (
            <PlayerCard
               key={`${players[profile.id].id}-player`}
               data={players[profile.id]}
            />
         )}
      </div>
   );
}

export default Profile;
