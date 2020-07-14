import React from "react";
import "./music-list.css";
const padLeftStr = (index) => {
  return `${index + 1}`.length > 1 ? index + 1 : `0${index + 1}`;
};
const MusicList = ({ newSongs, showIndex = false, type = "" }) => {
  const getArName = (v) => {
    console.log(v);
    let strs = [];
    if (type === "") {
      v.song.artists.map((item) => strs.push(item.name));
      return `${strs.join(" / ")} - ${v.song.album.name}`;
    }
    if (!v.ar || v.ar.length === 0) return "";
    if (type === "hot") {
      let strs = [];
      v.ar.map((item) => strs.push(item.name));
      return `${strs.join(" / ")} - ${v.al.name}`;
    }
  };

  return (
    <div className="m-songs">
      {newSongs.length
        ? newSongs.map((v, index) => (
            <div className="songsItem" key={index}>
              {showIndex ? (
                <div className={`sgfl ${index < 3 ? "sgfl-cred" : ""}`}>
                  {padLeftStr(index)}
                </div>
              ) : null}
              <div className="songfr f-bd">
                <div className="songchfl">
                  <div className="songtl">
                    {type === "" ? v.song.name : v.name}
                    <span style={{ color: "#888", marginLeft: "4px" }}>
                      {v.alia && v.alia.length ? `(${v.alia[0]})` : ""}
                      {v.song && v.song.alias && v.song.alias.length ? `(${v.song.alias[0]})` : ""}
                    </span>
                  </div>
                  <div className="songinfo">
                    <i className="u-hmsprt songhot"></i>
                    {getArName(v)}
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
