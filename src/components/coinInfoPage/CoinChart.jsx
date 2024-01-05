import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./coinchart.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const { id } = useParams();
  const [chart, setChart] = useState();
  const [option, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  });
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7
`
      )
      .then((res) => {
        setChart({
          labels: res.data.prices.map((e) => {
            const timeStamp = e[0];

            return new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(timeStamp);
          }),
          datasets: [
            {
              label: `${id}`,
              data: res.data.prices.map((e) => {
                return e[1];
              }),
              fill: true,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      });
  }, []);
  console.log(chart);
  return <>{chart ? <Line options={option} data={chart} /> : null}</>;
};

export default CoinChart;
