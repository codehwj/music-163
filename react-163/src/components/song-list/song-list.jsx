import React from "react";
import "./song-list.css";
const SongList = ({ recommentSons }) => {
  /**
   * @date 2020-07-08
   * @description 单位换算
   */
  const unitConverter = (num) => {
    if (!num || isNaN(num)) {
      return num;
    }
    // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
    num = Number(num);
    if (Math.abs(num) > 100000000) {
      return (num / 100000000).toFixed(1) + "亿";
    } else if (Math.abs(num) > 10000) {
      return (num / 10000).toFixed(1) + "万";
    } else {
      return num.toFixed(1);
    }
  };
  return (
    <div className="remd_songs">
      {recommentSons.length >= 1 ? (
        <ul className="remd_ul">
          {recommentSons.map((v, index) => (
            <li className="remd_li" key={index}>
              <div className="remd_img">
                <img className="u_img" src={v.picUrl} alt={v.name} />
                <span className="remd_lnum u-earp">
                  {unitConverter(v.playCount)}
                </span>
              </div>
              <p className="remd_text">{v.name}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default SongList;
