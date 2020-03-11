import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Card from "./Card/Card";
import Chart from "react-google-charts";

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

  getLineChartData() {
    const italy = this.state.covidData.confirmed?.locations
      .filter(location => location.country_code === "IT")
      .pop();
    console.log(italy);

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
      console.log(lineData);
      return lineData;
    }
  }

  mapKeyToLocaleDate(key) {
    return key
      .toLocaleString()
      .split(", ")[0]
      .slice(0, -2);
  }

  render() {
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar></Navbar>

          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Covid-19 Data</h1>
            <div className="row">
              <div className="col">
                <Card
                  background="bg-danger"
                  title="Deaths"
                  count={this.getDeathsCount()}
                />
              </div>
              <div className="col">
                <Card
                  background="bg-warning"
                  title="Confirmed"
                  count={this.getConfirmedCount()}
                />
              </div>
              <div className="col">
                <Card
                  background="bg-success"
                  title="Recovered"
                  count={this.getRecoveredCount()}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Chart
                  width={"600px"}
                  height={"400px"}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data={this.getLineChartData()}
                  options={{
                    hAxis: {
                      title: "Time"
                    },
                    vAxis: {
                      title: "Cases"
                    }
                  }}
                  rootProps={{ "data-testid": "1" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
