import React from 'react';
import './App.css';
import Routers from "./router"
// import { Provider } from 'react-redux'
// const store = {};

function App() {
  return (
    <div className="App" style={{ height: '100%' }}>
      <Routers></Routers>
    </div>
  );
}

export default App;
