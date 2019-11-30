import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './app/routes/Router';
import ScrollToTop from './app/components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="h-full">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
