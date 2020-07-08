import React from "react";
import "./music-list.css";
const MusicList = ({ newSongs }) => {
  return (
    <div className="m-songs">
      {newSongs.length
        ? newSongs.map((v, index) => (
            <div className="songsItem" key={index}>
              <div className="songfr f-bd">
                <div className="songchfl">
                  <div className="songtl">{v.song.name}</div>
                  <div className="songinfo">
                    <i className="u-hmsprt songhot"></i>
                    {v.song.artists[0].name}-{v.song.album.name}
                  </div>
                </div>
                <div className="sgchfr">
                  <span className="songsPlay u-hmsprt"></span>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
export default MusicList;
