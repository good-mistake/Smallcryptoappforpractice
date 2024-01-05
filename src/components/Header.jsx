import React from "react";
import "./header.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchparams.css";

const Header = () => {
  const [searchData, setSearchData] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFocus, setFocus] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${search}`)
      .then((res) => {
        setSearchData(res.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);
  if (!searchData) return null;
  let cryptoData = searchData?.coins.map((item) => {
    return item?.name?.toLocaleLowerCase() || item?.symbol?.toLocaleLowerCase();
  });
  console.log(searchData);
  return (
    <nav className="navbar header justify-content-evenly flex-wrap navbar-expand-md  bg-body-tertiary">
      <div className="container-fluid ">
        <a className="navbar-brand h2" href="/">
          CrypTO ExCHange
        </a>
        {/* <button class="navbar-toggler" onClick={() => setVisible(!visible)}>
          <span class="navbar-toggler-icon"></span>
        </button> */}
        <div className="items-in-navbar  " id="navbarSupportedContent">
          <form className="d-flex position-relative diactive" role="search">
            <input
              className="form-control height"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onFocus={() => setFocus(true)}
              onMouseEnter={() => setFocus(true)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            {hasFocus ? (
              <div
                className="search-results"
                onMouseLeave={() => setFocus(false)}
              >
                <ul>
                  {loading ? (
                    <div class="spinner-border" role="status">
                      <span class="sr-only"></span>
                    </div>
                  ) : null}
                  {search.length > 1
                    ? cryptoData
                        .filter((item) => {
                          return (
                            <li>
                              {" "}
                              (
                              {search?.toLocaleLowerCase() === ""
                                ? item
                                : item.name
                                    ?.toLocaleLowerCase()
                                    .includes(search) &&
                                  item.symbol
                                    ?.toLocaleLowerCase()
                                    .includes(search)}
                              );
                            </li>
                          );
                        })
                        .map((e) => {
                          return (
                            // <li className="search-results-list" key={e}>
                            <a
                              className="search-results-list"
                              href={`/coins/${e}`}
                            >
                              {e}
                            </a>
                            // </li>
                          );
                        })
                    : null}
                </ul>
              </div>
            ) : null}
          </form>
          <div className="navbar-nav " id="navbarSupportedContent">
            <a className="nav-link active " aria-current="page" href="/">
              Home
            </a>

            <a
              className="nav-link active"
              aria-current="page"
              href="/cryptoChartPage"
            >
              Crypto Chart
            </a>

            <a className="nav-link" href="/nftChart">
              NFT Chart
            </a>

            <a className="nav-link" href="/cryptoChartPage">
              About
            </a>
          </div>{" "}
        </div>
      </div>
    </nav>
  );
};

export default Header;
