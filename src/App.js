import React from 'react';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import RoutesElement from './components/RoutesElement';


function App() {
  return (
    <BrowserRouter>
    <Header />
    <main>
      <RoutesElement />
    </main>
    </BrowserRouter>
  );
}

export default App;
