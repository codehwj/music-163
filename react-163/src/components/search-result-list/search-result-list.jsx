import React from "react";
import "./search-result-list.css";
const padLeftStr = (index) => {
  return `${index + 1}`.length > 1 ? index + 1 : `0${index + 1}`;
};
const MusicList = ({ songs, showIndex = false, keyword = "" }) => {
  const getArName = (str) => {
    let patt = new RegExp(keyword, 'g');
    let highlight = `<span class='highlight'>${keyword}</span>`;
    if (patt.test(str)) {
      str = `${str}`.replace(patt, highlight);
    }
    return (
      <span dangerouslySetInnerHTML={{ __html: str }}></span>
    )
  };
  const getArtistsName = (artists) => {
    let names = [];
    artists.map(v => names.push(v.name));
    return names.join(" / ");
  }
  return (
    <div className="m-songs">
      {songs.length >= 1
        ? songs.map((v, index) => (
          <div className="songsItem" key={index}>
            {showIndex ? (
              <div className={`sgfl ${index < 3 ? "sgfl-cred" : ""}`}>
                {padLeftStr(index)}
              </div>
            ) : null}
            <div className="songfr f-bd">
              <div className="songchfl">
                <div className="songtl">
                  {getArName(v.name)}
                  <span style={{ color: "#888", marginLeft: "4px" }}>
                    {v.alia && v.alia.length ? `(${v.alia[0]})` : ""}
                    {v.song && v.song.alias && v.song.alias.length ? `(${v.song.alias[0]})` : ""}
                  </span>
                </div>
                <div className="songinfo">
                  {v.album.status < 3 ? <i className="u-hmsprt songhot"></i> : ""}
                  {getArName(`${getArtistsName(v.artists)} - ${v.album.name} `)}
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
