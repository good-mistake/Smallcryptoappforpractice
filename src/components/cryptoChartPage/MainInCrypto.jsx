import React from "react";
import "./mainInCrypto.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
const MainInCrypto = () => {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [search, setSearch] = useState("");
  let i = 1; //# number of rows
  const [rawData, setRawData] = useState(null); //fetching data from the API
  let [page, setPage] = useState([]); //current state page number of pages from coingeko max is 124
  page++; //since the index starts at zero and it should be at 1
  function handlePageClick({ selected: selectedPage }) {
    //handleclick function for the pagination
    setPage(selectedPage);
  }

  useEffect(() => {
    //fetching data
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${search}`) //coin gecko search api
      .then((res) => {
        setSearchData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((response) => {
        setRawData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, search]);
  if (!searchData) return null;
  if (!rawData) return null;
  let pageCount = Math.ceil(searchData.coins.length / 100);
  console.log(rawData);

  return (
    <div className="containerInCryptoChart">
      {" "}
      <div className="cryptoChart">
        {" "}
        {/* <form>
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
        </form>{" "} */}
        <table>
          <thead>
            {/* the table headers*/}
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Price</th>
              <th>1h%</th>
              <th>24h%</th>
              <th>7d%</th>
              <th>24h VOlume</th>
              <th>Market cap</th>
            </tr>
          </thead>
          {/* table body from the api data */}
          {rawData
            // .filter((item) => {
            //   return search.toLocaleLowerCase() === ""
            //     ? item
            //     : item.name.toLocaleLowerCase().includes(search) ||
            //         item.symbol.toLocaleLowerCase().includes(search);
            // })
            .map((e) => {
              return (
                <tbody key={e.id}>
                  <tr
                    className="onClick"
                    onClick={() => window.open(`/coins/${e.id}`, "_blank")}
                  >
                    {/** link to the selected crypto to get more info  */}
                    <td>{i++}</td>
                    <td className="idInCryptoChart">
                      <img
                        src={e.image}
                        className="imageInCryptoCHart"
                        alt="/"
                      />
                      {e.name}
                      {e.symbol}
                    </td>
                    <td>${e.current_price?.toLocaleString()}</td>
                    <td>
                      {e.price_change_percentage_1h_in_currency > 0 ? (
                        <div className="up">
                          {e.price_change_percentage_1h_in_currency?.toFixed(2)}
                          %
                        </div>
                      ) : (
                        <div className="down">
                          {e.price_change_percentage_1h_in_currency?.toFixed(2)}
                          %
                        </div>
                      )}
                    </td>
                    <td>
                      {e.price_change_percentage_24h > 0 ? (
                        <div className="up">
                          {e.price_change_percentage_24h?.toFixed(2)}%
                        </div>
                      ) : (
                        <div className="down">
                          {e.price_change_percentage_24h?.toFixed(2)}%
                        </div>
                      )}
                    </td>
                    <td>
                      {e.price_change_percentage_7d_in_currency > 0 ? (
                        <div className="up">
                          {e.price_change_percentage_7d_in_currency?.toFixed(2)}
                          %
                        </div>
                      ) : (
                        <div className="down">
                          {e.price_change_percentage_7d_in_currency?.toFixed(2)}
                          %
                        </div>
                      )}
                    </td>
                    <td>{e.total_volume?.toLocaleString()}</td>
                    <td>{e.market_cap?.toLocaleString()}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>{" "}
        {/**Pagination in bottom of the table  */}
      </div>{" "}
      <div className="paginate">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>>"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          previousLabel="<<<"
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default MainInCrypto;
