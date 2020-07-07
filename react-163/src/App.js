import React from 'react';
import './App.css';
import Routers from "./router"
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider>
        <Routers></Routers>
      </Provider>
    </div>
  );
}

export default App;
