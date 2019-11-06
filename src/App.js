import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './app/routes/Router';
import ScrollToTop from './app/components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <header className="App-header">
          <Router />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
