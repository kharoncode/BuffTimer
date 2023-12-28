import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/components/header/Header';
import Home from '@/pages/home/Home';
import { Login } from '@/pages/login/Login';
import Profile from '@/pages/profile/Profile';
import Favoris from '@/pages/favoris/Favoris';
import Players from '@/pages/players/Players';
import Error from '@/pages/error/Error';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Router>
               <Header />
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/favoris" element={<Favoris />} />
                  <Route path="/players" element={<Players />} />
                  <Route path="*" element={<Error />} />
               </Routes>
            </Router>
         </PersistGate>
      </Provider>
   );
}

export default App;
