import React from "react";
import "./music-list.css";
const padLeftStr = (index) => {
  return `${index + 1}`.length > 1 ? index + 1 : `0${index + 1}`;
};
const MusicList = ({ newSongs, showIndex = false, type = "" }) => {
  /*
  const SongMusic = ({ showIndex, v, index }) => {
    return (
      <div className="songsItem">
        {showIndex ? (
          <div className={`sgfl ${index < 3 ? "sgfl-cred" : ""}`}>
            {padLeftStr(index)}
          </div>
        ) : null}
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
    );
  };
  const HotMusic = ({ showIndex, v, index }) => {
    const getArName = (ar) => {
      if (ar.length === 0) return "";
      let strs = [];
      ar.map((item) => strs.push(item.name));
      return strs.join(" / ");
    };
    return (
      <div className="songsItem">
        {showIndex ? (
          <div className={`sgfl ${index < 3 ? "sgfl-cred" : ""}`}>
            {padLeftStr(index)}
          </div>
        ) : null}
        <div className="songfr f-bd">
          <div className="songchfl">
            <div className="songtl">
              {v.name}
              <span style={{ color: "#888", marginLeft: "4px" }}>
                {v.alia.length ? `(${v.alia[0]})` : ""}
              </span>
            </div>
            <div className="songinfo">
              <i className="u-hmsprt songhot"></i>
              {getArName(v.ar)}&nbsp;-&nbsp;{v.al.name}
            </div>
          </div>
          <div className="sgchfr">
            <span className="songsPlay u-hmsprt"></span>
          </div>
        </div>
      </div>
    );
  };
  */
  const getArName = (v) => {
    if (!v.ar || v.ar.length === 0) return "";
    if (type === "") return `${v.song.artists[0].name}-${v.song.album.name}`;
    if (type === "hot") {
      let strs = [];
      v.ar.map((item) => strs.push(item.name));
      return `${strs.join(" / ")}&nbsp;-&nbsp;${v.al.name}`;
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

// type === "" ? (
//   <SongMusic
//     v={v}
//     key={index}
//     index={index}
//     showIndex={showIndex}
//   ></SongMusic>
// ) : (
//   <HotMusic
//     v={v}
//     key={index}
//     index={index}
//     showIndex={showIndex}
//   ></HotMusic>
// )
export default MusicList;
