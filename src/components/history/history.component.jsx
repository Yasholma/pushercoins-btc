import React from "react";
import axios from "axios";
import moment from "moment";

import "./history.styles.css";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayPrice: {},
      yesterdayPrice: {},
      twoDaysPrice: {},
      threeDaysPrice: {},
      fourDaysPrice: {},
      loading: false,
    };
  }

  getETHPrices = (date) =>
    axios.get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=${date}`
    );
  getBTCPrices = (date) =>
    axios.get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=${date}`
    );
  getLTCPrices = (date) =>
    axios.get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=${date}`
    );

  getTodayPrice = () => {
    let t = moment().unix();
    this.setState({ loading: true });
    axios
      .all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
      .then(
        axios.spread((eth, btc, ltc) => {
          if (eth.data && btc.data && ltc.data) {
            this.setState({ loading: false });
          }
          const price = {
            date: moment.unix(t).format("MMMM Do YYYY"),
            eth: eth.data.ETH.USD,
            btc: btc.data.BTC.USD,
            ltc: ltc.data.LTC.USD,
          };

          localStorage.setItem("todayPrice", JSON.stringify(price));
          this.setState({ todayPrice: price });
        })
      );
  };

  getYesterdayPrice = () => {
    let t = moment().subtract(1, "days").unix();
    this.setState({ loading: true });
    axios
      .all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
      .then(
        axios.spread((eth, btc, ltc) => {
          if (eth.data && btc.data && ltc.data) {
            this.setState({ loading: false });
          }
          const price = {
            date: moment.unix(t).format("MMMM Do YYYY"),
            eth: eth.data.ETH.USD,
            btc: btc.data.BTC.USD,
            ltc: ltc.data.LTC.USD,
          };
          localStorage.setItem("yesterdayPrice", JSON.stringify(price));
          this.setState({ yesterdayPrice: price });
        })
      );
  };

  getTwoDaysPrice = () => {
    let t = moment().subtract(2, "days").unix();
    this.setState({ loading: true });
    axios
      .all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
      .then(
        axios.spread((eth, btc, ltc) => {
          if (eth.data && btc.data && ltc.data) {
            this.setState({ loading: false });
          }
          const price = {
            date: moment.unix(t).format("MMMM Do YYYY"),
            eth: eth.data.ETH.USD,
            btc: btc.data.BTC.USD,
            ltc: ltc.data.LTC.USD,
          };

          localStorage.setItem("twoDaysPrice", JSON.stringify(price));
          this.setState({ twoDaysPrice: price });
        })
      );
  };

  getThreeDaysPrice = () => {
    let t = moment().subtract(3, "days").unix();
    this.setState({ loading: true });
    axios
      .all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
      .then(
        axios.spread((eth, btc, ltc) => {
          if (eth.data && btc.data && ltc.data) {
            this.setState({ loading: false });
          }
          const price = {
            date: moment.unix(t).format("MMMM Do YYYY"),
            eth: eth.data.ETH.USD,
            btc: btc.data.BTC.USD,
            ltc: ltc.data.LTC.USD,
          };

          localStorage.setItem("threeDaysPrice", JSON.stringify(price));
          this.setState({ threeDaysPrice: price });
        })
      );
  };

  getFourDaysPrice = () => {
    let t = moment().subtract(4, "days").unix();
    this.setState({ loading: true });
    axios
      .all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
      .then(
        axios.spread((eth, btc, ltc) => {
          if (eth.data && btc.data && ltc.data) {
            this.setState({ loading: false });
          }
          const price = {
            date: moment.unix(t).format("MMMM Do YYYY"),
            eth: eth.data.ETH.USD,
            btc: btc.data.BTC.USD,
            ltc: ltc.data.LTC.USD,
          };

          localStorage.setItem("fourDaysPrice", JSON.stringify(price));
          this.setState({ fourDaysPrice: price });
        })
      );
  };

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({
        todayPrice: JSON.parse(localStorage.getItem("todayPrice")),
      });
      this.setState({
        yesterdayPrice: JSON.parse(localStorage.getItem("yesterdayPrice")),
      });
      this.setState({
        twoDaysPrice: JSON.parse(localStorage.getItem("twoDaysPrice")),
      });
      this.setState({
        threeDaysPrice: JSON.parse(localStorage.getItem("threeDaysPrice")),
      });
      this.setState({
        fourDaysPrice: JSON.parse(localStorage.getItem("fourDaysPrice")),
      });
    }
  }

  componentWillMount() {
    this.getTodayPrice();
    this.getYesterdayPrice();
    this.getTwoDaysPrice();
    this.getThreeDaysPrice();
    this.getFourDaysPrice();
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading Data</h1>;
    }
    return (
      <div className="history--section container">
        <h2>History (Past 5 days)</h2>
        <div className="history--section__box">
          <div className="history--section__box__inner">
            <h4>{this.state.todayPrice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.todayPrice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${this.state.todayPrice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${this.state.todayPrice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.yesterdayPrice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.yesterdayPrice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${this.state.yesterdayPrice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${this.state.yesterdayPrice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.twoDaysPrice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.twoDaysPrice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${this.state.twoDaysPrice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${this.state.twoDaysPrice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.threeDaysPrice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.threeDaysPrice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${this.state.threeDaysPrice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${this.state.threeDaysPrice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.fourDaysPrice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.fourDaysPrice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${this.state.fourDaysPrice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${this.state.fourDaysPrice.ltc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
