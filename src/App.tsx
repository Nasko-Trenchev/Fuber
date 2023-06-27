import NavigationHeader from './components/NavigationHeader/NavigationHeader';
import HomePage from './components/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/UserContext';
import { Register } from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <NavigationHeader />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
