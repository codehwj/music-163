import React, { useEffect, useState } from "react";
import SongList from "@/components/song-list/song-list";
import { getRequest } from "@/utils/dataClass/api";

import "./recommend.css";

function Recommend() {
  const [recommentSons, setRecommentSons] = useState([]);
  /**
   * @author codehwj@163.com
   * @description 获取推荐歌单
   * @date 2020-07-07
   */
  const getPersonalized = async () => {
    let { success, response } = await getRequest("/personalized");
    if (success) {
      setRecommentSons(response.slice(0, 6));
    }
  };

  useEffect(() => {
    // console.log("aaa");
    getPersonalized();
  });
  return (
    <div className="recommend">
      <h2 className="remd_tl">推荐歌单</h2>
      <div className="remd_songs">
        <SongList recommentSons={recommentSons}></SongList>
      </div>
      <h2 className="remd_tl">最新音乐</h2>
    </div>
  );
}
export default Recommend;
