import React from "react";
import Card from "./Card/Card";
import Chart from "react-google-charts";

const Worldwide = props => {
  return (
    <div>
      <h1 className="h3 mb-4"> Current Worldwide Covid-19 Data</h1>
      <div className="row">
        <div className="col">
          <Card
            background="bg-danger"
            title="Deaths"
            count={props.deathsCount}
          />
        </div>
        <div className="col">
          <Card
            background="bg-warning"
            title="Confirmed"
            count={props.confirmedCount}
          />
        </div>
        <div className="col">
          <Card
            background="bg-success"
            title="Recovered"
            count={props.recoveredCount}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="h3 mb-4 text-gray-800">Confirmed Cases</h3>
          <Chart
            chartType="GeoChart"
            data={props.geoChartData}
            mapsApiKey="YOUR_KEY_HERE"
            rootProps={{ "data-testid": "1" }}
            options={{
              colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
              backgroundColor: "#81d4fa",
              datalessRegionColor: "#ffffff",
              defaultColor: "#ffffff"
            }}
          />
        </div>
        <div className="col">

        </div>
      </div>
    </div>
  );
};

export default Worldwide;
