import React from "react";

import History from "./components/history/history.component";
import Today from "./components/today/today.component";

import "./App.css";

function App() {
  return (
    <div className="">
      <div className="top-header">
        <header className="container">
          <nav className="navbar">
            <div className="navbar-brand">
              <span className="navbar__item">PusherCoins</span>
            </div>
            <div className="navbar-end">
              <a
                className="navbar__item"
                href="https://pusher.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pusher.com
              </a>
            </div>
          </nav>
        </header>
      </div>
      <section className="results">
        <div className="container">
          <h1>
            PusherCoins is a realtime price information about <br /> BTC, ETH,
            and LTC.
          </h1>
        </div>
        <div className="results__inner">
          <Today />
          <History />
        </div>
      </section>
    </div>
  );
}

export default App;
