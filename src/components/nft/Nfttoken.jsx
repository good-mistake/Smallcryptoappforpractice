import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./nft.css";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
const Nfttoken = () => {
  const { id } = useParams();
  const [token, setToken] = useState([]);
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`).then((res) => {
      setToken(res.data);
    });
  }, [id]);
  console.log(token);
  return (
    <>
      {" "}
      <div>
        <div className="token-container">
          <img src={token.image?.small} alt="/" />
          <div>name : {token.name}</div>
          <div>id : {token.id}</div>
          <div>contract address : {token.contract_address}</div>
          <div>asset platform id : {token.asset_platform_id}</div>
          <div>floor price : {token.floor_price?.usd} $</div>
          <div>
            floor price percentage 24h :
            {token.floor_price_in_usd_24h_percentage_change} %
          </div>
          <div>market cap : {token.market_cap?.usd} $</div>
          <div>native currency : {token.native_currency}</div>
          <div>unique addresses : {token.number_of_unique_addresses}</div>
          <div>
            unique addresses 24h :{" "}
            {token.number_of_unique_addresses_24h_percentage_change} %
          </div>
          <div>total supply : {token.total_supply}</div>
          <div>volume 24h : {token.volume_24h?.usd} $</div>{" "}
          <p className="token-description">
            {token.description ? parse(token.description) : null}
          </p>
        </div>
      </div>
    </>
  );
};

export default Nfttoken;
