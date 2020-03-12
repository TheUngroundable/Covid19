import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Chart from "react-google-charts";
import Worldwide from "./Worldwide/Card/Worldwide";
import Italy from "./Italy/Italy";

class Content extends Component {
  state = {
    covidData: {},
    error: ""
  };

  componentDidMount() {
    axios
      .get("https://coronavirus-tracker-api.herokuapp.com/all")
      .then(res => {
        this.setState({ covidData: res.data });
        console.log(this.state.covidData);
      })
      .catch(error => this.setState({ error }));
  }

  getDeathsCount() {
    return this.state.covidData.latest ? this.state.covidData.latest.deaths : 0;
  }

  getConfirmedCount() {
    return this.state.covidData.latest
      ? this.state.covidData.latest.confirmed
      : 0;
  }

  getRecoveredCount() {
    return this.state.covidData.latest
      ? this.state.covidData.latest.recovered
      : 0;
  }

  getItalyLineChartData() {
    const italy = this.state?.covidData?.confirmed?.locations
      .filter(location => location.country_code === "IT")
      .pop();

    if (italy?.history) {
      const historyKeys = Object.keys(italy.history);
      const sortedKeys = historyKeys.slice().sort((a, b) => {
        const aDate = new Date(a);
        const bDate = new Date(b);
        return aDate - bDate;
      });
      const lineData = [
        ["x", "Cases"],
        ...sortedKeys?.map((key, index) => [index, +italy?.history[key]])
      ];
      return lineData.filter(data => data[1] !== 0);
    }
  }

  mapKeyToLocaleDate(key) {
    return key
      .toLocaleString()
      .split(", ")[0]
      .slice(0, -2);
  }

  getGeoChartData() {
    const contagedData = this.state.covidData?.confirmed?.locations
      .filter(contaged => contaged[1] !== 0)
      .map(location => [location.country_code, location.latest]);
    if (contagedData) {

      const mergedCountries = new Map();

      contagedData.forEach(data => {
        const key = data[0];
        if(mergedCountries.has(key)){
          // mergedCountries.add(data[1], )
        } else {
          mergedCountries.set(key, data[1]);
        }
      });
      return [["Country", "Cases"], ...mergedCountries];
    }
  }

  render() {
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar></Navbar>

          <div className="container-fluid">
            <Worldwide
              deathsCount={this.getDeathsCount()}
              confirmedCount={this.getConfirmedCount()}
              recoveredCount={this.getRecoveredCount()}
              geoChartData={this.getGeoChartData()}
            />
            <hr />
            <Italy lineChartData={this.getItalyLineChartData()} />
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
