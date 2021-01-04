import React, { useState, useEffect } from "react";
import { getRequest } from "@/common/js/api";
import { Icon } from "antd-mobile";
// import { throttle } from "@/utils/common";
import "./search.css";

function Search() {
  const [hots, setHots] = useState([]);
  const [keyword, setKeyword] = useState("");

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
      setKeyword(e.target.value);
    }
  };
  const clickHotItem = ({ first }) => {
    console.log(first);
    setKeyword(first);
  };
  useEffect(() => {
    getSearchHot();
  }, []);

  return (
    <div className="search">
      <div className="m-input">
        <div className="inputcover">
          <Icon type="search" size="xxs" className="icon search-icon" />
          {/* autocomplete="off" */}
          <input
            type="text"
            name="search"
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
                setKeyword("");
              }}
            />
          )}
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
}
export default Search;
