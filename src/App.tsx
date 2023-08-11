import NavigationHeader from './components/NavigationHeader/NavigationHeader';
import HomePage from './components/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/UserContext';
import { Register } from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Details from './components/Details/Details';
import { OrderContextProvider } from './contexts/OrderContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <OrderContextProvider>
          <NavigationHeader />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/resetPassword' element={<PasswordReset />} />
            <Route path='/restaurant/:restaurantId/:restaurantName' element={<Details />} />
          </Routes>
        </OrderContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
