import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowDown, BsArrowUpRight } from "react-icons/bs";
import CoinChart from "./CoinChart";
import "./coinchart.css";
import parse from "html-react-parser";
const CoinPage = () => {
  const { id } = useParams(); //useParams for the coin id thats opening on this page
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) => {
      setCoin(res.data);
    });
  }, [id]);
  return (
    <>
      <div className="containerInCoinPage">
        <div className="description">
          <img src={coin.image?.large} alt={`${coin.name}`} />
          <div>
            {coin.name}
            {"         "}
            {coin.symbol}
          </div>
          <div>Current Price: {coin.market_data?.current_price.usd}</div>
          <div>Rank:{coin.market_cap_rank}</div>
          <div>
            Market Cap:{coin.market_data?.market_cap.usd.toLocaleString()}
          </div>
          <div>
            24h Price Change:
            {coin.market_data?.price_change_24h.toLocaleString()}
          </div>
          {/* <div>{coin.description?.en}</div> */}
          <div>
            Fully Diluted Valuation:
            {coin.market_data?.fully_diluted_valuation.usd.toLocaleString()}
          </div>{" "}
          <div>
            Total supply: {coin.market_data?.total_supply.toLocaleString()}
          </div>
          {coin.market_data?.max_supply
            ? `Max supply: ${coin.market_data?.max_supply.toLocaleString()}`
            : ""}
          <div>
            Total Volume: {coin.market_data?.total_volume.usd.toLocaleString()}
          </div>
          <div className="up">24h High: {coin.market_data?.high_24h.usd}$</div>
          <div className="down">24h Low: {coin.market_data?.low_24h.usd}$</div>
          <div>
            circulating supply:{" "}
            {coin.market_data?.circulating_supply.toLocaleString()}
          </div>
          {coin.market_data?.price_change_percentage_24h > 0 ? (
            <div className="up">
              Up: +{coin.market_data?.price_change_percentage_24h.toFixed(2)}%
              {"      "}
              <BsArrowUpRight />
            </div>
          ) : (
            <div className="down">
              Down : {coin.market_data?.price_change_percentage_24h.toFixed(2)}
              % <BsArrowDown />
            </div>
          )}
        </div>
        <div className="chart">{<CoinChart />}</div>{" "}
        {/*coinchart from the other component */}
      </div>
      <p className="coin-description-en">
        {coin.description ? parse(coin.description.en) : ""}
      </p>
    </>
  );
};

export default CoinPage;
