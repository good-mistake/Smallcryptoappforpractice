import React from "react";
import "./main.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [rawData, setRawData] = useState(null);
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/search/trending`) //trending data about coins
      .then((res) => {
        setTrending(res.data);
      });
    axios //getting news data
      .get(
        "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo"
      )
      .then((response) => {
        setRawData(response.data.feed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!rawData) return null;
  if (!trending) return null;
  console.log(rawData);
  return (
    <div className="main1">
      <div className="containerInMain">
        {" "}
        <h1>Lorem Ipsum</h1>
        <div className="topSectionInMain">
          <form action="" method="get" className="main-form">
            {" "}
            <p>
              Enter your email in the form blow to get the latest news about
              Crypto currencies and Nft as soon as possible
            </p>{" "}
            <label htmlFor="name">Enter your First name</label>
            <div>
              {" "}
              <input type="text" id="name" name="name" required />
            </div>{" "}
            <label htmlFor="name">Enter your Last name</label>
            <div>
              {" "}
              <input type="text" id="name" name="name" required />
            </div>
            <label htmlFor="email">Enter your email</label>
            <div>
              {" "}
              <input type="email" name="email" id="email" required />
            </div>{" "}
            <label htmlFor="email">Enter your phone number</label>
            <div>
              {" "}
              <input type="email" name="email" id="email" required />
            </div>
            <div className="form-checkbox">
              <label htmlFor="checkbox">I am older then 18:</label>
              <input type="checkbox" id="checkbox" />
            </div>
            <div>
              {" "}
              <button type="submit" className="submit">
                Submit
              </button>
            </div>
          </form>
          <div className="trending-coins">
            <h4>Trending Coins the past 24 hours from coingecko :</h4>
            {trending.coins.map((i) => {
              return (
                <>
                  <div className="trend">
                    <div>
                      <img src={i.item.small} alt="/" />
                    </div>
                    <div>{i.item.name}</div>
                    <div>{i.item.symbol}</div>
                    <div>Price Btc:{i.item.price_btc.toFixed(8)}</div>
                    Market cap rank:{i.item.market_cap_rank}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="news">
          {rawData.map((i) => {
            return (
              <div className="news-content">
                <img src={i.banner_image} alt="/" />
                <div>
                  <div className="news-content-text">
                    <a href={i.url}>
                      {" "}
                      <h4>{i.title}</h4>
                    </a>
                    <p>{i.summary}</p>
                    Source: {i.source}{" "}
                    <div>
                      Topic:{"         "}
                      {i.topics.map((i) => {
                        return <span className="topic">{i.topic} </span>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
