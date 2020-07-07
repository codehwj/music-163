import React, { useState } from "react";
// import { HashRouter, Route, Redirect } from 'react-router-dom';

function Search() {
  const [count] = useState(0);
  return (
    <div>
      <div>搜索{count}</div>
    </div>
  );
}
export default Search;
