import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/homepage/Home";
import CryptoChartPage from "./components/cryptoChartPage/CryptoChartPage";
import CoinPage from "./components/coinInfoPage/CoinPage";
import { useState } from "react";
import Nft from "./components/nft/Nft";
import Header from "./components/Header";
import Nfttoken from "./components/nft/Nfttoken";
import Form from "react-bootstrap/Form";
import Footer from "./components/Footer";

export const ThemeContext = React.createContext(null);

const App = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeContext.Provider value={(theme, toggleTheme)}>
        <div className="switch" id={theme}>
          <Header></Header>{" "}
          <div className="set-theme">
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={toggleTheme}
              label={theme === "light" ? "Light Mode" : "Dark Mode"}
            />
          </div>
          <Routes>
            <Route path="/cryptoChartPage" element={<CryptoChartPage />} />
            <Route path="/coins/:id" element={<CoinPage />} exact />
            <Route path="/" element={<Home />} id={theme} className="App" />
            <Route path="/nftChart" element={<Nft />} exact />
            <Route path="/nft/:id" element={<Nfttoken />} exact />
          </Routes>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
