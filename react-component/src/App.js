import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './commons/sidebar/Sidebar';
import Home from './pages/Home';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
