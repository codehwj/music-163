import React, { useState, useEffect, useReducer } from "react";
import { getRequest } from "@/common/js/api";
import { Icon } from "antd-mobile";
// import { throttle } from "@/utils/common";
import SearchResultList from "@/components/search-result-list/search-result-list";
import useDebounce from "../../hooks/useDebounce"
import "./search.css";

function Search() {
  const [hots, setHots] = useState([]);
  const [keyword, setKeyword] = useState("");
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

  // 搜索内容改变
  const searchOnChange = (e) => {
    e.persist();
    setMultimatchResult({});
    if (e.type === "change") {
      let value = e.target.value;
      searchMusicListByKeyword(value);
    }
  };
  // 搜索列表点击
  const clickListItem = (item) => {
    let currKeyword = item.keyword || item.first;
    setKeyword(currKeyword);
    let newHistory = historyList.filter(chunk => chunk.first !== currKeyword);
    newHistory.unshift({ first: currKeyword });
    setHistoryList(newHistory)
    getSearchMultimatchList(currKeyword);
  };
  const closeCurrHistory = (index) => {
    let newHistory = historyList.slice(0);
    newHistory.splice(index, index + 1);
    setHistoryList(newHistory);
  }

  const searchMusicListByKeyword = (keyword) => {
    if (keyword) {
      setKeyword(keyword);
      setSearchResult(keyword)
    } else {
      setAllMatchList([])
      setKeyword("");
      setMultimatchResult({});
    }
  }


  const setSearchResult = async (keyword) => {
    let { success, response } = await getRequest(`/search/suggest?type=mobile&keywords=${keyword}`);
    if (success) {
      response.allMatch && response.allMatch.length && setAllMatchList(response.allMatch)
    }
  }
  const getSearchMultimatchList = async (keyword) => {
    setMultimatchResult({})
    let { success, response } = await getRequest(`/search?keywords=${keyword}`);
    if (success) {
      setMultimatchResult(response);
    }
  }

  useEffect(() => {
    useDebounceValue && setSearchResult(useDebounceValue)
    if (hots && !hots.length) {
      getSearchHot();
    }
    // if (Object.keys(multimatchResult).length === 0) {
    //   getSearchMultimatchList(keyword);
    // }
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
      {!keyword && Object.keys(multimatchResult).length === 0 && <DefaultList hots={hots} list={historyList} closeCurrHistory={closeCurrHistory} clickListItem={clickListItem}></DefaultList>}
      {keyword && Object.keys(multimatchResult).length === 0 && <SuggestList keyword={keyword} list={allMatchList} clickListItem={clickListItem} ></SuggestList>}
      {keyword && Object.keys(multimatchResult).length >= 1 && <ResultList keyword={keyword} result={multimatchResult} ></ResultList>}
    </div>
  );
}


function DefaultList({ hots, list, closeCurrHistory, clickListItem }) {
  return (
    <div className="m-default">
      <section className="m-hotlist">
        <h3 className="title">热门搜索</h3>
        <ul className="list">
          {hots.length >= 1
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
          {list && list.length >= 1 && list.map((item, index) => (
            <li className="item" key={`${item}-${index}`} onClick={() => clickListItem(item)}>
              <i className="iconfont u-svg u-svg-histy">&#xe61d;</i>
              <div className="histyr f-bd f-bd-btm">
                <span className="link f-thide ellipsis">{item.first}</span>
                <figure className="close" onClick={(e) => {e.nativeEvent.stopImmediatePropagation();e.stopPropagation(); closeCurrHistory(index)}}>
                  <i className="iconfont">&#xe622;</i>
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function SuggestList({ keyword, list = [{ keyword: "1122" }, { keyword: 3344 }, { keyword: 5566 }], clickListItem = () => { } }) {
  return (
    <section className="m-recom">
      <h3 className="title f-bd f-bd-btm f-thide" onClick={() => clickListItem({keyword: keyword})}>搜索“{keyword}”</h3>
      <ul>
        {list && list.length >= 1 && list.map((item, index) => (
          <li className="recomitem" key={item.keyword} onClick={() => clickListItem(item)}>
            <Icon type="search" size="xxs" color="#ccc" className="u-svg u-svg-search"></Icon>
            <span className="f-bd f-bd-btm f-thide ellipsis">{item.keyword}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ResultList({result, keyword}) {
  if (!result || Object.keys(result).length === 0) return null;
  return (
    <div className="remd_songs">
      <SearchResultList songs={result.songs} keyword={keyword}></SearchResultList>
    </div>
  )
}

export default Search;
