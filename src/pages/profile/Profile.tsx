import PlayerCard from '@/components/playerCard/PlayerCard';
import { getPlayers, getProfile } from '@/router/selectors';
import { useSelector } from 'react-redux';

function Profile() {
   const profile = useSelector(getProfile);
   const players = useSelector(getPlayers);
   return (
      <div>
         Hello {profile.name}
         <PlayerCard
            key={`${players.players[profile.id].id}-player`}
            data={players.players[profile.id]}
         />
      </div>
   );
}

export default Profile;
