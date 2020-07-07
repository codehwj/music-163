import React, { useState } from "react";
// import { HashRouter, Route, Redirect } from "react-router-dom";

function HotMusic() {
  const [count] = useState(0);
  return (
    <div>
      <div>热歌榜{count}</div>
    </div>
  );
}
export default HotMusic;
