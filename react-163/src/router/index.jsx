import React from "react";
// import { Provider } from 'react-redux'
import { HashRouter, Route } from "react-router-dom";
import DashBoard from "../views/dashBoard/dashBoard"

function Routers() {
  return (
    <HashRouter>
      {/* <Route path="/Recommend" component={Recommend}></Route>
      <Route path="/HotMusic" component={HotMusic}></Route>
      <Route path="/Search" component={Search}></Route> */}
      <Route component={DashBoard}></Route>
    </HashRouter>
  );
}

export default Routers;
