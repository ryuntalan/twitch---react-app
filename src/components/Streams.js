import React, { useEffect, useState } from "react";
import api from "../api";

function Stream() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`https://api.twitch.tv/helix/streams?`);
      let dataArray = result.data.data;
      let gameIDs = dataArray.map(streams => {
        return streams.game_id;
      });
      let baseURL = "https://api.twitch.tv/helix/games?";
      let queryParams = "";
      gameIDs.map(id => {
        return (queryParams = queryParams + `id=${id}&`);
      });

      let finalURL = baseURL + queryParams;
      let gameNames = await api.get(finalURL);
      let gameNameArray = gameNames.data.data;

      let finalArray = dataArray.map(stream => {
        stream.gameName = "";
        gameNameArray.map(name => {
          if (stream.game_id === name.id) {
            return (stream.gameName = name.name);
          }
        });

        let newURL = stream.thumbnail_url
          .replace("{width}", "400")
          .replace("{height}", "400");
        stream.thumbnail_url = newURL;
        return stream;
      });
      setChannels(finalArray);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Most Popular Live Streams</h1>
      <div className="row">
        {channels.map(channel => (
          <div className="col-lg-3 col-md-6 col-sm-12 mt-5 text-center">
            <div className="card">
              <img className="card-img-top" src={channel.thumbnail_url} />
              <div className="card-body">
                <h4 className="card-title">{channel.user_name}</h4>
                <h5 className="card-text"> {channel.gameName}</h5>
                <div className="card-text">
                  {channel.viewer_count} live viewers
                </div>
                <button className="btn btn-success">
                  <a
                    href={"https://twitch.tv/" + channel.user_name}
                    className="link"
                    target="_blank"
                  >
                    Watch {channel.user_name}'s' Stream
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stream;
