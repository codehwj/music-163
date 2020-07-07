import React, { useState } from "react";
// import { Provider } from 'react-redux'
import { HashRouter, Route, Redirect } from "react-router-dom";
import Recommend from "../views/recommend";
import HotMusic from "../views/hotMusic";
import Search from "../views/search";

function Routers() {
  return (
    <HashRouter>
      <Route path="/Recommend" component={Recommend}></Route>
      <Route path="/HotMusic" component={HotMusic}></Route>
      <Route path="/Search" component={Search}></Route>
      {/* <Redirect to={Recommend}></Redirect> */}
    </HashRouter>
  );
}

export default Routers;
