import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./nft.css";
const Nft = () => {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [search, setSearch] = useState("");
  let i = 1; //# number of rows
  const [rawData, setRawData] = useState(null); //fetching data from the API

  useEffect(() => {
    //fetching data
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${search}`)
      .then((res) => {
        setSearchData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`https://api.coingecko.com/api/v3/nfts/list`)
      .then((response) => {
        setRawData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);
  if (!searchData) return null;
  if (!rawData) return null;
  return (
    <div className="container-in-nft">
      {" "}
      <form className="searchbox-in-nft">
        {/*create a search box to search the elements on this page */}
        <input
          value={search}
          type="searchbox"
          placeholder="search for an item in this page"
          className="searchbox"
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        ) : null}
      </form>{" "}
      <div className="container-in-nft-card">
        {searchData.nfts
          .filter((item) => {
            return search.toLocaleLowerCase() === ""
              ? item
              : item.name.toLocaleLowerCase().includes(search) ||
                  item.symbol.toLocaleLowerCase().includes(search);
          })
          .map((e) => {
            return (
              <div className="nft-card" key={e.id}>
                <div className="nfts">
                  <div
                    className="onClick nfts"
                    onClick={() => window.open(`/Nft/${e.id}`, "_blank")}
                  >
                    {/** link to the selected token to get more info  */}
                    <img src={e.thumb} alt="/" />

                    <div>{i++}</div>
                    <div>{e.id} </div>
                    <div>{e.name}</div>

                    <div>
                      {e.symbol.length > 14 ? e.symbol.toLowerCase() : e.symbol}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>{" "}
    </div>
  );
};

export default Nft;
