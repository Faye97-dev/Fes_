import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "react-apexcharts";
import { Grid, Card, CardContent, Button, Divider } from "@material-ui/core";

export class Charts extends Component {
  render() {
    const data = [
      {
        name: "Transferts",
        data: [
          20010,
          53000,
          38000,
          24000,
          30300,
          26000,
          21000,
          20000,
          6000,
          8000,
          15000,
          10000,
        ],
      },
      {
        name: "Retraits",
        data: [
          30005,
          40100,
          62000,
          40002,
          13000,
          18000,
          29000,
          37000,
          30060,
          51000,
          32000,
          35000,
        ],
      },
    ];
    const options = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#1bc943", "#f4772e"],
      stroke: {
        width: [5, 5],
        curve: "smooth",
        dashArray: [0, 7],
      },
      title: {
        text: "Statistiques de Transactions",
        align: "left",
        style: {
          fontSize: "18px",
        },
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
        offsetY: 5,
        fontSize: "15px",
        itemMargin: {
          horizontal: 15,
          vertical: 0,
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Fev",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juil",
          "Aout",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      yaxis: {
        min: 0,
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (MRU)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " (MRU)";
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    };

    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Card className="card-box mb-4">
              <div className="card-footer  text-center">
                <div className="pt-4 pr-4 pl-4">
                  <Chart
                    options={options}
                    series={data}
                    type="line"
                    height={500}
                  />
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Charts;
{
  /* <Grid item xs={12} lg={6}>
            <Card className="card-box mb-4">
              <div className="card-body pb-1">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "user"]}
                          className="font-size-xxl text-success"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">2,345</b>
                        <span className="text-black-50 d-block">users</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "keyboard"]}
                          className="font-size-xxl text-danger"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">3,568</b>
                        <span className="text-black-50 d-block">clicks</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="pt-4 pr-4 pl-4">
                  <Chart
                    options={chart31Options}
                    series={chart31Data}
                    type="line"
                    height={100}
                  />
                </div>
              </div>
              <Divider />
              <div className="my-2 text-center">
                <FontAwesomeIcon
                  icon={["fas", "arrow-up"]}
                  className="text-danger"
                />
                <span className="text-danger px-1">15.4%</span>
                <span className="text-black-50">new sales today</span>
              </div>
              <div className="card-footer bg-light p-4 text-center">
                <Button color="primary" variant="contained">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={["far", "eye"]} />
                  </span>
                  <span className="btn-wrapper--label">View latest sales</span>
                </Button>
              </div>
            </Card>
          </Grid>
       */
}
