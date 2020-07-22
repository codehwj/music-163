import React, { useState, useEffect } from "react";
import MusicList from "@/components/music-list/music-list";
import { getRequestWithData } from "@/common/js/api";
import "./hotMusic.css"

function HotMusic() {
  const [hotMusic, setHotMusic] = useState([]);
  const [hotItem, setHotItem] = useState([]);

  const getToplist = () => {
    getRequestWithData(`/toplist/detail`).then(({ code, list }) => {
      if (code === 200) {
        const item = list.find((item) => item.name.includes("热歌"));
        setHotItem(item);
        getPlaylistDetail(item);
      }
    });
  };

  const getPlaylistDetail = ({ id }) => {
    getRequestWithData(`/playlist/detail?id=${id}`).then(
      ({ code, playlist }) => {
        if (code === 200) {
          setHotMusic(playlist.tracks.slice(0, 20));
        }
      }
    );
  };

  useEffect(() => {
    getToplist();
  }, []);

  return (
    <div className="hot">
      <div className="hotop">
        <div className="hotopct">
          <div className="u-hmsprt hoticon"></div>
          <div className="hottime">更新日期：{hotItem.updateFrequency}</div>
        </div>
      </div>
      <div className="hotcont">
        <MusicList newSongs={hotMusic} showIndex={true} type="hot"></MusicList>
      </div>
    </div>
  );
}
export default HotMusic;