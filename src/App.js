import logo from './logo.svg';
import './App.css';
import ShowData from './components/ShowData';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <ShowData />
      <Outlet />
    </div>
  );
}

export default App;
