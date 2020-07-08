import React, { useEffect, useState } from "react";
import SongList from "@/components/song-list/song-list";
import MusicList from "@/components/music-list/music-list";
import { getRequest } from "@/common/js/api";

import "./recommend.css";

function Recommend(props) {
  const [recommentSons, setRecommentSons] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
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
  const getNewSong = async () => {
    let { success, response } = await getRequest("/personalized/newsong");
    if (success) {
      setNewSongs(response);
    }
  };

  useEffect(() => {
    // const subscription = props.source.subscribe();

    getPersonalized();
    getNewSong();

    // return () => {
    //   // 清除订阅
    //   subscription.unsubscribe();
    // };
  }, []);
  return (
    <div className="recommend">
      <h2 className="remd_tl">推荐歌单</h2>
      <div className="remd_songs">
        <SongList recommentSons={recommentSons}></SongList>
      </div>
      <h2 className="remd_tl">最新音乐</h2>
      <div className="remd_songs">
        <MusicList newSongs={newSongs}></MusicList>
      </div>
    </div>
  );
}
export default Recommend;
