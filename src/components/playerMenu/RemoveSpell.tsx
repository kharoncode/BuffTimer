import { useDispatch, useSelector } from 'react-redux';
import styles from './editUser.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { getPlayersList } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { useParams } from 'react-router-dom';
import { deletePlayerBuff } from '@/pages/players/playersSlice';
import { player, spell } from '@/utils/formatPlayer';

const RemoveSpell = () => {
   const { id } = useParams();
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const players = useSelector(getPlayersList);
   const player: player = players[id];
   const activeSpellsList: spell[] = [];
   Object.values(player.spells).map((el) => {
      if (el.date !== null) {
         activeSpellsList.push(el);
      }
   });

   const [checkedList, setCheckedList] = useState([]);
   console.log(checkedList);

   const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.id;
      const isChecked = e.target.checked;

      if (isChecked) {
         setCheckedList([...checkedList, value]);
      } else {
         const filteredList = checkedList.filter(
            (item: string) => item !== value
         );
         setCheckedList(filteredList);
      }
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result = {
         id: id,
         list: checkedList,
      };
      console.log(result);
      dispatch(deletePlayerBuff(result)).then(() => {
         setLoading(false);
      });
   };

   return (
      <div className={styles.container}>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmit(e);
            }}
         >
            <h3>Modifier le Mot de Passe</h3>
            <div className={styles.checkboxContainer}>
               {activeSpellsList.map((el) =>
                  el.date === null ? (
                     <></>
                  ) : (
                     <div key={`${el.id}-checkbox`} className={styles.checkbox}>
                        <label htmlFor={`${el.id}Input`}>{el.name}</label>
                        <input
                           type="checkbox"
                           id={`${el.id}`}
                           name="spellsCheckbox"
                           onChange={(e) => {
                              handleSelect(e);
                           }}
                        />
                     </div>
                  )
               )}
            </div>
            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Envoyer'}
            </button>
         </form>
      </div>
   );
};

export default RemoveSpell;
