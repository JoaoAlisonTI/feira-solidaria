import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemDetails from './pages/ItemDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
