import React, { useState, useEffect, useReducer } from "react";
import { getRequest } from "@/common/js/api";
import { Icon } from "antd-mobile";
// import { throttle } from "@/utils/common";
import useDebounce from "../../hooks/useDebounce"
import "./search.css";

function Search() {
  const [hots, setHots] = useState([]);
  const [keyword, setKeyword] = useState("1122");
  const history = localStorage.getItem("historyList");
  // 历史列表
  const [historyList, setHistoryList] = useReducer((state, action) => {
    localStorage.setItem("historyList", JSON.stringify(action));
    return action
  }, history ? JSON.parse(history) : []);
  const [allMatchList, setAllMatchList] = useState([])
  const [multimatchResult, setMultimatchResult] = useState({})
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
  const clickListItem = (item) => {
    console.log(item);
    setKeyword(item.keyword);
    let newHistory = historyList.filter(chunk => chunk.first !== item.keyword);
    newHistory.unshift({first: item.keyword});
    setHistoryList(newHistory)
    getSearchMultimatchList(item.keyword);
  };
  const closeCurrHistory = (index) => {
    let newHistory = historyList.slice(0);
    newHistory.splice(index, index + 1);
    setHistoryList(newHistory);
  }

  const searchMusicListByKeyword = (keyword) => {
    console.log(keyword);
    if (keyword) {
      setKeyword(keyword);
      setSearchResult(keyword)
    } else {
      setAllMatchList([])
      setKeyword("");
    }
  }


  const setSearchResult = async (keyword)=> {
    let {success, response} = await getRequest(`/search/suggest?type=mobile&keywords=${keyword}`);
    if (success) {
      response.allMatch && response.allMatch.length && setAllMatchList(response.allMatch)
    }
  }
  const getSearchMultimatchList = async () => {
    let {success, response} = await getRequest(`/search/multimatch?keywords=${keyword}`);
    if (success) {
      console.log(response);
      setMultimatchResult(response)
    }
  }

  useEffect(() => {
    useDebounceValue && setSearchResult(useDebounceValue)
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
     {!keyword && <DefaultList hots={hots} list={historyList} closeCurrHistory={closeCurrHistory} clickListItem={clickListItem}></DefaultList>}
     {keyword && <SuggestList keyword={keyword} list={allMatchList} clickListItem={clickListItem} ></SuggestList>}
    </div>
  );
}

function DefaultList({hots, list, closeCurrHistory, clickListItem}) {
  return (
    <div className="m-default">
    <section className="m-hotlist">
      <h3 className="title">热门搜索</h3>
      <ul className="list">
        {hots.length
          ? hots.map((item, index) => (
            <li
              className="item f-db f-bd-full"
              key={index}
              onClick={() => clickListItem(item)}
            >
              {item.first}
            </li>
          ))
          : null}
      </ul>
    </section>
    <section className="m-history">
      <ul className="list">
        {list && list.length && list.map((item, index) => (
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
  )
}

function SuggestList({keyword, list = [{keyword: "1122"}, {keyword: 3344}, {keyword: 5566}], clickListItem = () => {}}) {
  return (
    <section className="m-recom">
      <h3 className="title f-bd f-bd-btm f-thide">搜索“{keyword}”</h3>
      <ul>
        {list && list.length && list.map((item, index) => (
          <li className="recomitem" key={item.keyword} onClick={() => clickListItem(item)}>
            <Icon type="search" size="xxs" color="#ccc" className="u-svg u-svg-search"></Icon>
            <span className="f-bd f-bd-btm f-thide">{item.keyword}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Search;
