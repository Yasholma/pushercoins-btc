const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser");

const app = express();

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "983985",
  key: "27ca4bf5be7e8b1e0d73",
  secret: "defdbebe934c0abfbcd9",
  cluster: "eu",
  encrypted: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.set("port", 5000);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/prices/new", (req, res) => {
  pusher.trigger("coin-prices", "prices", {
    prices: req.body.prices,
  });
  res.sendStatus(200);
});

app.listen(app.get("port"), () => {
  console.log(`Node App Is Running On Port: ${app.get("port")}`);
});
