import React, { useState, useEffect } from "react";
import MusicList from "@/components/music-list/music-list";
import { getRequestWithData } from "@/common/js/api";
import "./hotMusic.css"

function HotMusic() {
  const [hotMusic, setHotMusic] = useState([]);
  const [hotItem, setHotItem] = useState([]);

  const getToplist = () => {
    getRequestWithData(`/toplist`).then(({ success, response: {code, list} }) => {
      if (code === 200) {
        const item = list.find((item) => item.name.includes("热歌"));
        setHotItem(item);
        getPlaylistDetail({query: `id=${item.id}`});
      }
    });
  };

  // 获取榜单列表trackids
  const getPlaylistDetail = ({ query }) => {
    getRequestWithData(`/playlist/detail?${query}`).then(
      ({ success, response: {code, playlist} }) => {
        if (code === 200) {
          // setHotMusic(playlist.tracks.slice(0, 20));
          getSongDetailByTrackIds(playlist.trackIds);
        }
      }
    );
  };

  const getSongDetailByTrackIds = async (trackIds) => {
    if (!trackIds || trackIds.length === 0) return;
    let ids = [];
    for (const item of trackIds) {
      if (ids.length >= 20) {
        break;
      }
      ids.push(item.id)
    }
    let { success, response } = await getRequestWithData(`/song/detail?ids=${ids.join(",")}`)
    if (success) {
      setHotMusic(response.songs);
    }
  };

  const formatDate = (date) => {
    let time = new Date(parseInt(date));
    // let y = time.getFullYear();  //年
    let m = time.getMonth() + 1;  //月
    if (m < 10) { m = '0' + m }
    let d = time.getDate();  //日
    if (d < 10) { d = '0' + d }
    let h = time.getHours();  //时
    if (h < 10) { h = '0' + h }
    let mm = time.getMinutes();  //分
    if (mm < 10) { mm = '0' + mm }
    let s = time.getSeconds();  //秒
    if (s < 10) { s = '0' + s }
    // let timeStr = y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
    return `${m}月${d}日`;
  }

  useEffect(() => {
    getToplist();
  }, []);

  return (
    <div className="hot">
      <div className="hotop">
        <div className="hotopct">
          <div className="u-hmsprt hoticon"></div>
          {hotItem && hotItem.updateTime && <div className="hottime">更新日期：{formatDate(hotItem.updateTime)}</div>}
        </div>
      </div>
      <div className="hotcont">
        <MusicList newSongs={hotMusic} showIndex={true} type="hot"></MusicList>
      </div>
    </div>
  );
}
export default HotMusic;
