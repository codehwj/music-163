import React from "react";
import "./song-list.css";
const SongList = (props) => {
  return (
    <div className="remd_songs">
      {props.recommentSons.length && (
        <ul className="remd_ul">
          {props.recommentSons.map((v, index) => (
            <li className="remd_li" key={index}>
              <div className="remd_img">
                <img className="u_img" src={v.picUrl} />
                <span className="remd_lnum">{v.playCount}</span>
              </div>
              <p className="remd_text">{v.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SongList;
