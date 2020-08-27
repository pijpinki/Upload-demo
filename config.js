require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
  openWeatherUrl: process.env.OPEN_WEATHER_URL
};
