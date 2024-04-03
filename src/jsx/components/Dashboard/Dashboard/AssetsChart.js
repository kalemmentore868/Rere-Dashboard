import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function AssetsChart({ balance }) {
  const [state, setState] = useState({
    series: [balance],
    options: {
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          //expandOnClick: false,
          // startAngle: 120,
          //endAngle: 360,
          donut: {
            size: "78%",
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 0,
              },
              value: {
                show: true,
                fontSize: "14px",
                fontFamily: "Arial",
                offsetY: 5,
              },
              total: {
                show: true,
                fontSize: "12px",
                fontWeight: "800",
                fontFamily: "Arial",
                label: "Total Assets",

                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return `£${a + b}`;
                  }, 0);
                },
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
      colors: ["#C0E192", "#C0E192", "#C0E192", "#C0E192"],
      labels: ["VIP", "Reguler", "Exclusive", "Economic"],
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              //width: 200
            },
          },
        },
      ],
    },
  });
  return (
    <div id="">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        height={200}
        //width={400}
      />
    </div>
  );
}

export default AssetsChart;
