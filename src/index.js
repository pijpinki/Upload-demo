const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const openWeatherApi = require("./services/OpenWeatherApi");
const usersRouter = require("./routers/users");
const config = require("../config");

const app = express();
const users = new Map();

app.use(morgan("tiny"));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.ip);

  if (req.method === "POST" && res.ip !== "127.0.0.1") {
    return res.status(403).send({ message: "Kesha" });
  }

  next();
});

app.use("/app", express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

app.get("/users/:userId/commnets", (req, res) => {
  const { limit, match } = req.query;
});

app.get("/users", (req, res) => {
  res.send({
    users: Array.from(users.values())
  });
});

app.post("/users", (req, res) => {
  const { name, surname = "unknown" } = req.body;

  if (!name) {
    return res.status(400).send({ message: "Bad params, missed name" });
  }

  users.set(`${name}-${surname}`, { name, surname });

  res.send("<h1>User was created</h1>");
});

app.get("/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (Number.isNaN(latitude) && latitude >= -90 && latitude <= 90) {
      return res.status(400).send({ message: "LAT wrong value" });
    }

    if (Number.isNaN(longitude) && longitude >= -180 && longitude <= 80) {
      return res.status(400).send({ message: "LON wrong value" });
    }

    const response = await openWeatherApi.getWeatherByCords({
      lat: latitude,
      lon: longitude
    });

    res.send(response);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
});

app.post("/weather", (req, res) => {
  console.info("body ->", req.body);

  res.send();
});

app.use((req, res, next) => {
  res.send({ message: "page not found" });
});

app.listen(config.port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.info("server started at port", config.port);
});
