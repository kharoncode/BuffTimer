import { useDispatch, useSelector } from 'react-redux';
import styles from './editUser.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { getPlayersList, getUser } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { uptadeUserFavoris } from '@/pages/login/loginSlice';

const EditFavoris = () => {
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const { id, favoris } = useSelector(getUser);
   const players = useSelector(getPlayersList);

   const [favorisCheckedList, setfavorisCheckedList] = useState(
      favoris.split(' ')
   );

   const handleSelectFavoris = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.id;
      const isChecked = e.target.checked;

      if (isChecked) {
         setfavorisCheckedList([...favorisCheckedList, value]);
      } else {
         const filteredList = favorisCheckedList.filter(
            (item: string) => item !== value
         );
         setfavorisCheckedList(filteredList);
      }
   };

   const handleSubmitFavoris = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result = {
         id: id,
         list: favorisCheckedList.join(' '),
      };
      dispatch(uptadeUserFavoris(result)).then(() => {
         setLoading(false);
      });
   };

   return (
      <div className={styles.container}>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmitFavoris(e);
            }}
         >
            <h3>Modifier la liste des Favoris</h3>
            <div className={styles.checkboxContainer}>
               {Object.keys(players).map((key) => (
                  <div
                     key={`${players[key].id}-checkbox`}
                     className={styles.inputContainer}
                  >
                     <label htmlFor={`${players[key].id}Input`}>
                        {players[key].name}
                     </label>
                     {favoris.split(' ').includes(players[key].id) ? (
                        <input
                           type="checkbox"
                           id={`${players[key].id}`}
                           name="favorisCheckbox"
                           defaultChecked
                           onChange={(e) => {
                              handleSelectFavoris(e);
                           }}
                        />
                     ) : (
                        <input
                           type="checkbox"
                           id={`${players[key].id}`}
                           name="favorisCheckbox"
                           onChange={(e) => {
                              handleSelectFavoris(e);
                           }}
                        />
                     )}
                  </div>
               ))}
            </div>
            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Envoyer'}
            </button>
         </form>
      </div>
   );
};

export default EditFavoris;
