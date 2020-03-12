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
      </div>
    </div>
  );
};

export default Italy;
