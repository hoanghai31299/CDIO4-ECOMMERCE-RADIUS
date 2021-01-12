import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Col, Card, Button } from "react-bootstrap";
export default function Chart({ data }) {
  const [option, setOption] = useState("day");
  const transformData = (data, option = "year") => {
    const previousYear = (currentYear) => {
      return +currentYear - 1 + "";
    };
    const previousMonth = (currentMonth) => {
      if (currentMonth.slice(5, 7) === "01") {
        return `${+currentMonth.slice(0, 4) - 1}-${12}`;
      }
      return `${currentMonth.slice(0, 4)}-${+currentMonth.slice(5, 7) - 1}`;
    };
    const previousDay = (currentDay) => {
      return new Date(new Date(currentDay).getTime() - 1000 * 60 * 60 * 24)
        .toISOString()
        .slice(0, 10);
    };
    const options = {
      year: {
        slice: [0, 4],
        loop: 4,
        previous: previousYear,
      },
      month: {
        slice: [0, 7],
        loop: 13,
        previous: previousMonth,
      },
      day: {
        slice: [0, 10],
        loop: 15,
        previous: previousDay,
      },
    };
    const dates = [];
    const nowTime = new Date().toISOString().slice(...options[option].slice);
    dates.push([nowTime, 0, 0]);
    for (let i = 1; i < options[option].loop; i++) {
      dates.push([options[option].previous(dates[i - 1][0]), 0, 0]);
    }
    dates.reverse();
    // console.log("dates", dates);
    const value = data.reduce((obj, order) => {
      let key = order.createdAt.slice(...options[option].slice);
      if (obj[key]) {
        obj[key][0] += 1;
        obj[key][1] += order.lastTotal;
      } else {
        obj[key] = [1, order.lastTotal];
      }
      return obj;
    }, {});
    // console.log(value);
    for (let date of dates) {
      if (value[date[0]]) {
        // console.log(value[date[0]]);
        date[1] = value[date[0]][0];
        date[2] = value[date[0]][1];
      }
    }
    const labels = dates.map(([label, value1, value2]) => label);
    const amountOrders = dates.map(([label, value1, value2]) => value1);
    const saleValues = dates.map(([label, value1, value2]) => value2);
    return parseData(labels, amountOrders, saleValues);
  };

  const parseData = (labels, amountOrders, saleValues) => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Total Orders",
          type: "line",
          data: amountOrders,
          fill: false,
          backgroundColor: "rgb(155,143,212)",
          borderColor: "rgb(155,143,212)",
          yAxisID: "y-axis-2",
          lineTension: 0.1,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
        {
          label: "Sales Value",
          type: "line",
          data: saleValues,
          fill: false,
          backgroundColor: "rgb(29,230,185)",
          borderColor: "rgb(29,230,185)",
          yAxisID: "y-axis-1",
          lineTension: 0.1,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    };
  };
  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          ticks: {
            beginAtZero: true,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <Col>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h5">Overview ({option.toUpperCase()})</Card.Title>

          <div className="float-left">
            <Button
              variant={`outline-${option === "month" ? "danger" : "info"} `}
              size="sm"
              onClick={() => setOption("month")}>
              Month
            </Button>
            <Button
              variant={`outline-${option === "year" ? "danger" : "info"} `}
              size="sm"
              onClick={() => setOption("year")}>
              Year{" "}
            </Button>
            <Button
              variant={`outline-${option === "day" ? "danger" : "info"} `}
              size="sm"
              onClick={() => setOption("day")}>
              Day{" "}
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {data && (
            <Line data={transformData(data, option)} options={options} />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
