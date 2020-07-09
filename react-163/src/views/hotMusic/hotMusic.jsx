import React, { useState, useEffect } from "react";
import MusicList from "@/components/music-list/music-list";
import { getRequestWithData } from "@/common/js/api";

function HotMusic() {
  const [hotMusic, setHotMusic] = useState([]);

  const getToplist = () => {
    //
    getRequestWithData(`/toplist/detail`).then(({ code, list }) => {
      if (code === 200) {
        const hotItem = list.find((item) => item.name.includes("热歌"));
        // console.log(hotItem);
        getPlaylistDetail(hotItem)
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
      <div className="hotop">热歌榜</div>
      <div className="hotcont">
        <MusicList newSongs={hotMusic} showIndex={true} type="hot"></MusicList>
      </div>
    </div>
  );
}
export default HotMusic;
