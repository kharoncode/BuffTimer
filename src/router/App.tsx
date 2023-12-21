import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/components/header/Header';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import Profile from '@/pages/profile/Profile';
import Favoris from '@/pages/favoris/Favoris';
import General from '@/pages/general/General';
import Error from '@/pages/error/Error';

function App() {
   return (
      <Router>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/general" element={<General />} />
            <Route path="/error" element={<Error />} />
         </Routes>
      </Router>
   );
}

export default App;
