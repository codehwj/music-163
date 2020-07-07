import React, { useState, useEffect } from "react";
// import { HashRouter, Route, Redirect } from "react-router-dom";

function Recommend(props) {
  const [count] = useState(0);

  useEffect(() => {
    // console.log("aaa");
  });
  return <div className="recommend">哈哈哈{count}</div>;
}
export default Recommend;
