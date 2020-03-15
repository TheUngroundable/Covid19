import React from "react";
import Chart from "react-google-charts";

const Italy = props => {
  return (
    <div>
      <h1 className="h3 mb-4">Current status in Italy</h1>
      <div className="row">
        <div className="col">
          <Chart
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={props.lineChartData}
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
        <div className="col">
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="GeoChart"
            data={props.geoChartData}
            options={{
              region: "IT",
              displayMode: "markers",
              colorAxis: { colors: ["green", "red"] }
            }}
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            mapsApiKey="AIzaSyD0WCEi-DgZW0t3AYDxw5XDSXN4L3DackY"
            rootProps={{ "data-testid": "2" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Italy;
