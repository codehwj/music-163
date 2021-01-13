import React, { useState, useEffect, useReducer, useRef } from "react";
import { getRequest } from "@/common/js/api";
import { Icon, PullToRefresh, Toast } from "antd-mobile";
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
  // 搜索结果
  const [allMatchList, setAllMatchList] = useState([])
  // 关键词搜索结果
  const [multimatchSongs, setMultimatchSongs] = useState([])
  // 搜索分页
  const [offset, setOffset] = useState(0);
  // 是否还有更多
  const [hasMore, setHasMore] = useState(true);
  // useRef
  const keywordDom = useRef(1);
  
  let useDebounceValue = useDebounce(keyword, 3000);

  const getSearchHot = () => {
    getRequest("/search/hot").then(({ success, response }) => {
      if (success) {
        setHots(response.hots);
      }
    });
  };

  // 搜索内容改变
  const searchOnChange = async (e) => {
    e.persist();
    setMultimatchSongs([]);
    if (e.type === "change") {
      let value = e.target.value;
      console.log(value);
      searchMusicListByKeyword(value);
    }
  };
  const multimatchInputChange = async (e) => {
    await searchOnChange(e);
    keywordDom.current.focus();
  }
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
    setMultimatchSongs([]);
    if (keyword) {
      setKeyword(keyword);
      setSearchResult(keyword)
    } else {
      setAllMatchList([])
      setKeyword("");
    }
  }


  const setSearchResult = async (keyword) => {
    let { success, response } = await getRequest(`/search/suggest?type=mobile&keywords=${keyword}`);
    if (success) {
      response.allMatch && response.allMatch.length && setAllMatchList(response.allMatch)
    }
  }
  const getSearchMultimatchList = async (keyword) => {
    let { success, response } = await getRequest(`/search?keywords=${keyword}&limit=30&offset=${offset * 30}`);
    if (success) {
      let newMultimatchSongs = multimatchSongs.slice(0);
      setMultimatchSongs(newMultimatchSongs.concat(response.songs));
      setHasMore(response.hasMore);
      if (response.hasMore) {
        setOffset(offset + 1);
      }
      return response;
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
      {keyword && multimatchSongs.length > 0 ?
        <ResultList keyword={keyword} songs={multimatchSongs} hasMore={hasMore} getSearchMultimatchList={getSearchMultimatchList} multimatchInputChange={multimatchInputChange} searchMusicListByKeyword={searchMusicListByKeyword}></ResultList>:
        <div className="search-body">
          <div className="m-input">
            <div className="inputcover">
              <Icon type="search" size="xxs" className="icon search-icon" />
              <input
                type="text"
                name="search"
                autoComplete="off"
                value={keyword}
                ref={keywordDom}
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
          {!keyword && multimatchSongs.length === 0 && <DefaultList hots={hots} list={historyList} closeCurrHistory={closeCurrHistory} clickListItem={clickListItem}></DefaultList>}
          {keyword && multimatchSongs.length === 0 && <SuggestList keyword={keyword} list={allMatchList} clickListItem={clickListItem} ></SuggestList>}

        </div> }
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
                <figure className="close" onClick={(e) => { e.nativeEvent.stopImmediatePropagation(); e.stopPropagation(); closeCurrHistory(index) }}>
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
      <h3 className="title f-bd f-bd-btm f-thide" onClick={() => clickListItem({ keyword: keyword })}>搜索“{keyword}”</h3>
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

function ResultList({ songs = [], keyword, hasMore, getSearchMultimatchList, multimatchInputChange, searchMusicListByKeyword }) {
  // 是否显示刷新状态
  const [refreshing, setRefreshing] = useState(false);
  return (
    <PullToRefresh
      damping={60}
      style={{
        height: document.body.clientHeight - 40,
        overflow: 'auto',
      }}
      indicator={{ deactivate: '上拉可以刷新' }}
      direction={'up'}
      refreshing={refreshing}
      onRefresh={async () => {
        if (hasMore) {
          setRefreshing(true)
          await getSearchMultimatchList(keyword);
          setRefreshing(false)
        } else {
          Toast.info('已经是最后一页了 !!!', 1);
        }
      }}
    >
      <div className="remd_songs">
        <div className="m-input">
          <div className="inputcover">
            <Icon type="search" size="xxs" className="icon search-icon" />
            <input
              type="text"
              name="search"
              autoComplete="off"
              value={keyword}
              className="input"
              placeholder="搜索歌曲、歌手、专辑"
              onChange={multimatchInputChange}
            />
            {keyword && (
              <Icon
                type="cross-circle-o"
                size="xxs"
                className="icon close-icon"
                onClick={() => searchMusicListByKeyword("")}
              />
            )}
          </div>
        </div>
        <SearchResultList songs={songs} keyword={keyword}></SearchResultList>
      </div>
    </PullToRefresh>
  )
}

export default Search;
