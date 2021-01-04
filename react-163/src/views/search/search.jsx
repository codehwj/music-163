import React, { useState, useEffect, useReducer } from "react";
import { getRequest } from "@/common/js/api";
import { Icon } from "antd-mobile";
// import { throttle } from "@/utils/common";
import useDebounce from "../../hooks/useDebounce"
import "./search.css";

function Search() {
  const [hots, setHots] = useState([]);
  const [keyword, setKeyword] = useState("");
  const history = localStorage.getItem("historyList");
  const [historyList, setHistoryList] = useReducer((state, action) => {
    localStorage.setItem("historyList", JSON.stringify(action));
    return action
  }, history ? JSON.parse(history) : []);
  let useDebounceValue = useDebounce(keyword, 3000);

  const getSearchHot = () => {
    getRequest("/search/hot").then(({ success, response }) => {
      if (success) {
        setHots(response.hots);
      }
    });
  };

  const searchOnChange = (e) => {
    e.persist();
    if (e.type) {
      console.log(e.target.value);
      searchMusicListByKeyword(e.target.value);
    }
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

  const searchMusicListByKeyword = (keyword) => {
    if (keyword) {
      setKeyword(keyword);
      let newHistory = historyList.filter(item => item.first !== keyword);
      newHistory.unshift({first: keyword});
      // setHistoryList(newHistory);
      setSearchResult(keyword)
    } else {
      setKeyword("");
    }
  }

  const setSearchResult = async (keyword)=> {
    let {success, response} = await getRequest(`/search/suggest?keywords=${keyword}`);
    if (success) {
      console.log(response);
    }
  }

  useEffect(() => {
    setSearchResult(useDebounceValue)
    if (hots && !hots.length) {
      getSearchHot();
    }
  }, [useDebounceValue, hots]);

  return (
    <div className="search">
      <div className="m-input">
        <div className="inputcover">
          <Icon type="search" size="xxs" className="icon search-icon" />
          <input
            type="text"
            name="search"
            autocomplete="off"
            value={keyword}
            className="input"
            placeholder="搜索歌曲、歌手、专辑"
            onChange={searchOnChange}
          />
          {keyword && (
            <Icon
              type="cross-circle-o"
              size="xxs"
              className="icon close-icon"
              onClick={() => {
                searchMusicListByKeyword("");
              }}
            />
          )}
        </div>
      </div>
      <div className="m-default">
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
      </div>
    </div>
  );
}



function SuggestList(params) {
  return (
    <section className="m-recom">
      <h3 className="title f-bd f-bd-btm f-thide">11</h3>
      <ul>
        <li className="recomitem">
          <i className="u-svg u-svg-search"></i>
          <span className="f-bd f-bd-btm f-thide"></span>
        </li>
      </ul>
    </section>
  )
}

export default Search;
