import React from "react";
import axios from "axios";
import Pusher from "pusher-js";

import "./today.styles.css";

class Today extends React.Component {
  state = {
    btcprice: "",
    ltcprice: "",
    ethprice: "",
  };

  sendPricePusher = (data) => {
    axios
      .post("/prices/new", { prices: data })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ btcprice: localStorage.getItem("BTC") });
      this.setState({ ltcprice: localStorage.getItem("LTC") });
      this.setState({ ethprice: localStorage.getItem("ETH") });
    }

    setInterval(() => {
      axios
        .get(
          "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
        )
        .then((res) => {
          this.sendPricePusher(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 10000);

    this.prices.bind(
      "prices",
      (price) => {
        this.setState({ btcprice: price.prices.BTC.USD });
        this.setState({ ltcprice: price.prices.ETH.USD });
        this.setState({ ethprice: price.prices.LTC.USD });
      },
      this
    );
  }

  componentWillMount() {
    this.pusher = new Pusher("27ca4bf5be7e8b1e0d73", {
      cluster: "eu",
      forceTLS: true,
    });

    this.prices = this.pusher.subscribe("coin-prices");

    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
      )
      .then((res) => {
        this.setState({ btcprice: res.data.BTC.USD });
        localStorage.setItem("BTC", res.data.BTC.USD);

        this.setState({ ltcprice: res.data.ETH.USD });
        localStorage.setItem("ETH", res.data.ETH.USD);

        this.setState({ ethprice: res.data.LTC.USD });
        localStorage.setItem("LTC", res.data.LTC.USD);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="today container">
        <h2>Current Price</h2>
        <div className="columns today__box">
          <div className="column btc__section">
            <h5>${this.state.btcprice}</h5>
            <p>1 BTC</p>
          </div>
          <div className="column eth__section">
            <h5>${this.state.ethprice}</h5>
            <p>1 ETH</p>
          </div>
          <div className="column ltc__section">
            <h5>${this.state.ltcprice}</h5>
            <p>1 LTC</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Today;
