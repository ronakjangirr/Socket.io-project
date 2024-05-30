import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";
import NameContext from './component/NameContext';

function App() {
  const [userName, setUserName] = useState("");

  return (
    <BrowserRouter>
      <NameContext.Provider value={{ userName, setUserName }}>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </NameContext.Provider> 
  </BrowserRouter> 
  );
}

export default App;