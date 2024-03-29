import React from "react";
import ReactApexChart from "react-apexcharts";

class TotalBalanceArea extends React.Component {  
	constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Net Profit",
          data: [0, ...this.props.investments.map(
            (investment) => investment.total_return
          )],
        },
      ],
      options: {
        chart: {
          type: "area",
          height: 130,
          width: 400,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          sparkline: {
            enabled: true,
          },
        },

        /* plotOptions: {
          bar: {
              horizontal: false,
              endingShape:'rounded',
              columnWidth: '35%',
              borderRadius: 2,                    
          },
      }, */

        colors: ["var(--primary)"],
        dataLabels: {
          enabled: false,
        },

        legend: {
          show: false,
        },
        stroke: {
          show: true,
          width: 3,
          curve: "smooth",
          colors: ["var(--primary)"],
        },
        grid: {
          show: false,
          borderColor: "#eee",
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: -1,
          },
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          hover: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "none",
              value: 0,
            },
          },
        },
        xaxis: {
          //categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July','August', 'Sept','Oct'],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            style: {
              fontSize: "12px",
            },
          },
          crosshairs: {
            show: false,
            position: "front",
            stroke: {
              width: 1,
              dashArray: 3,
            },
          },
          tooltip: {
            enabled: true,
            formatter: undefined,
            offsetY: 0,
            style: {
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          show: false,
        },
        fill: {
          opacity: 0.9,
          colors: "var(--primary)",
          type: "gradient",
          gradient: {
            colorStops: [
              {
                offset: 0,
                color: "var(--primary)",
                opacity: 0.8,
              },
              {
                offset: 0.6,
                color: "var(--primary)",
                opacity: 0.6,
              },
              {
                offset: 100,
                color: "white",
                opacity: 0,
              },
            ],
          },
        },
        tooltip: {
          enabled: false,
          style: {
            fontSize: "12px",
          },
          y: {
            formatter: function (val) {
              return "$" + val + " thousands";
            },
          },
        },
      },
    };
  }


  
	render() {
        return (
            <div id="NewCustomers">
                <ReactApexChart 
					options={this.state.options} 
					series={this.state.series} 
					type="area" 
					height={130}  
					width={400}
				/>
            </div>
        );
	}
}

export default TotalBalanceArea;