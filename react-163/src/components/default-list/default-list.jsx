
import React, { useState, useEffect, useReducer } from "react";
import { getRequest } from "@/common/js/api";

function defaultList() {
  const [hots, setHots] = useState([]);
  const history = localStorage.getItem("historyList");
  const [historyList, setHistoryList] = useReducer((state, action) => {
    console.log(action);
    localStorage.setItem("historyList", JSON.stringify(action));
    return action
  }, history ? JSON.parse(history) : []);

  const getSearchHot = () => {
    getRequest("/search/hot").then(({ success, response }) => {
      if (success) {
        setHots(response.hots);
      }
    });
  };
  const clickHotItem = ({ first }) => {
    console.log(first);
    searchMusicListByKeyword(first)
  };
  const closeCurrHistory = (index) => {
    let newHistory = historyList.slice(0);
    let a = newHistory.splice(index, index + 1);
    console.log(a);
    setHistoryList(newHistory);
  }

  useEffect(() => {
    getSearchHot();
  }, [])
  return (<div className="m-default">
  <section className="m-hotlist">
    <h3 className="title">热门搜索</h3>
    <ul className="list">
      {hots.length
        ? hots.map((item, index) => (
          <li
            className="item f-db f-bd-full"
            key={index}
            onClick={() => clickHotItem(item)}
          >
            {item.first}
          </li>
        ))
        : null}
    </ul>
  </section>
  <section className="m-history">
    <ul className="list">
      {historyList.map((item, index) => (
        <li className="item" key={`${item}-${index}`}>
          <Icon type="search" color="#ccc" className="u-svg u-svg-histy" size="sm" />
          <div className="histyr f-bd f-bd-btm">
            <span className="link f-thide">{item.first}</span>
            <figure className="close" onClick={() => closeCurrHistory(index)}>
              <Icon type="cross" color="#ccc" />
            </figure>
          </div>
        </li>
      ))}
    </ul>
  </section>
</div>)
}

export default defaultList