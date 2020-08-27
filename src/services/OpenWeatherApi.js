const fetch = require("node-fetch");
const config = require("../../config");

class OpenWeatherApi {
  async request(endpoint, params) {
    const requestUrl = `${config.openWeatherUrl}/${endpoint}`;

    const response = await fetch(
      requestUrl +
        `?${new URLSearchParams({
          ...params,
          appid: config.openWeatherApiKey
        })}`
    );

    if (response.status < 200 || response.status > 299) {
      const error = new Error("Response error");

      error.response = response.json();

      throw error;
    }

    return response.json();
  }

  async getWeatherByCords({ lat, lon }) {
    return this.request("weather", { lat, lon });
  }

  async getWeatherByName(cityName) {
    return this.request("weather", { q: cityName });
  }
}

module.exports = new OpenWeatherApi();
