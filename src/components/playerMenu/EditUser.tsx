import { useDispatch, useSelector } from 'react-redux';
import styles from './editUser.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { getDataSpheres, getUser } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { newData, uptadeUser } from '@/pages/login/loginSlice';

const EditUser = () => {
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const { id, login, email, intelligence, spheres } = useSelector(getUser);
   const spheresList = useSelector(getDataSpheres);
   const [spheresCheckedList, setspheresCheckedList] = useState(
      spheres.split(' ')
   );

   const handleSubmitUpdateUser = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result: newData = {
         id: id,
         login: e.currentTarget.login.value,
         email: e.currentTarget.email.value,
         intelligence: e.currentTarget.intelligence.value,
         spheres: spheresCheckedList.join(' '),
      };
      dispatch(uptadeUser(result)).then(() => {
         setLoading(false);
      });
   };

   const handleSelectSpheres = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.id;
      const isChecked = e.target.checked;

      if (isChecked) {
         setspheresCheckedList([...spheresCheckedList, value]);
      } else {
         const filteredList = spheresCheckedList.filter(
            (item: string) => item !== value
         );
         setspheresCheckedList(filteredList);
      }
   };

   return (
      <div className={styles.container}>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmitUpdateUser(e);
            }}
         >
            <h3>Modifier le profile</h3>
            <div className={styles.inputContainer}>
               <label htmlFor={`email`}>Email</label>
               <input type="text" id={`email`} required defaultValue={email} />
            </div>
            <div className={styles.inputContainer}>
               <label htmlFor={`login`}>Login</label>
               <input type="text" id={`login`} required defaultValue={login} />
            </div>
            <div className={styles.inputContainer}>
               <label htmlFor={`intelligence`}>Intelligence</label>
               <input
                  type="text"
                  id={`intelligence`}
                  required
                  defaultValue={intelligence}
               />
            </div>

            <h4>Spheres</h4>
            <div className={styles.checkboxContainer}>
               {Object.keys(spheresList).map((key) => (
                  <div key={`${key}-checkbox`} className={styles.checkbox}>
                     <label htmlFor={`${key}Input`}>
                        {spheresList[key].name}
                     </label>
                     {spheres.split(' ').includes(key) ? (
                        <input
                           type="checkbox"
                           id={`${key}`}
                           name="favorisCheckbox"
                           defaultChecked
                           onChange={(e) => {
                              handleSelectSpheres(e);
                           }}
                        />
                     ) : (
                        <input
                           type="checkbox"
                           id={`${key}`}
                           name="favorisCheckbox"
                           onChange={(e) => {
                              handleSelectSpheres(e);
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

export default EditUser;
