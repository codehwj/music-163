import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./dashBoard.css";

import Recommend from "../recommend/recommend";
import HotMusic from "../hotMusic/hotMusic";
import Search from "../search/search";

const navList = [
  {
    component: Recommend,
    title: "推荐音乐",
    path: "/Recommend",
    hide: false,
    icon: "",
  },
  {
    component: HotMusic,
    title: "热歌榜",
    path: "/HotMusic",
    hide: false,
    icon: "",
  },
  {
    component: Search,
    title: "搜索",
    path: "/Search",
    hide: false,
    icon: "",
  },
];
const RedirectRouter = "/Search";

function DashBoard(props) {
  const [pathname, setPathName] = useState(window.location.hash.split("#")[1]);
  useEffect(() => {
    console.log();
  });

  return (
    <div className="dashBoard">
      {pathname === "/" && <Redirect to={RedirectRouter}></Redirect>}
      <nav className="nav f-bd">
        {navList.map((v, index) => (
          <div
            className={`navItem  ${pathname === v.path ? "active" : ""} ${
              pathname === "/" && index === 2 ? "active" : ""
            }`}
            key={index}
            onClick={() => {
              props.history.push(v.path);
              setPathName(v.path);
            }}
          >
            <div className="navTxt">{v.title}</div>
          </div>
        ))}
      </nav>
      <div className="dashBody">
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
          <Switch>
            {navList.map((v) => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
