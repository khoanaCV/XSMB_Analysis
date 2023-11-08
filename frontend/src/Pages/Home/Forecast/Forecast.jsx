import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const Forecast = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const [poissonDataTop, setPoissonDataTop] = useState([]);
  const [poissonDataChart, setPoissonDataChart] = useState([]);
  const [gaussDataTop, setGaussDataTop] = useState([]);
  const [gaussDataChart, setGaussDataChart] = useState([]);
  useEffect(() => {
    //get data Poisson
    axios
      .get(process.env.REACT_APP_URL_SERVER + "/forecast/poissonModel")
      .then((response) => {
        const data = Object.entries(response?.data);
        data.sort((a, b) => b[1] - a[1]);
        setPoissonDataChart(data);
        setPoissonDataTop(data.slice(0, 15)); // Lấy 20 số đầu tiên
      })
      .catch((error) => {
        console.error("Error fetching special prizes data: ", error);
      });

    //get data Gaussian
    axios
      .get(process.env.REACT_APP_URL_SERVER + "/forecast/gaussModel")
      .then((response) => {
        const data = Object.entries(response?.data);
        data.sort((a, b) => b[1] - a[1]);
        setGaussDataChart(data);
        setGaussDataTop(data.slice(0, 15)); // Lấy 20 số đầu tiên
      })
      .catch((error) => {
        console.error("Error fetching special prizes data: ", error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Phân phối Poisson",
      },
    },
  };

  const labels = poissonDataChart.map((item, index) => item[0]);

  const data = {
    labels,
    datasets: [
      {
        label: "Lô",
        data: poissonDataChart.map((item, index) => item[1]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  //Gaussian
  const optionsGauss = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Phân phối Gaussian",
      },
    },
  };

  const labelsGauss = gaussDataChart.map((item, index) => item[0]);

  const dataGauss = {
    labels: labelsGauss,
    datasets: [
      {
        label: "Lô",
        data: gaussDataChart.map((item, index) => item[1]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <Container>
      <Row>
        <Col md={12} lg={12} sm={12} className="">
          <div className="text-left flex flex-col items-center">
            <h1>Dự Đoán Kết Quả</h1>
          </div>

          <div class="p-3 mb-2">
            Dự đoán Poisson cho ngày {getCurrentDate()}
            <div class="container flex flex-col items-center">
              <div class="col-sm mt-2 flex text-xl text-red-500 font-bold">
                Numbers:
                {poissonDataTop.map((item, index) => (
                  <div className="mx-2">{item[0]}</div>
                ))}
              </div>
              <Line options={options} data={data} />
            </div>
          </div>

          <div class="p-3 mb-2">
            Dự đoán Gaussian cho ngày {getCurrentDate()}
            <div class="container flex flex-col items-center">
              <div class="col-sm mt-2 flex text-xl text-red-500 font-bold">
                Numbers:
                {gaussDataTop.map((item, index) => (
                  <div className="mx-2">{item[0]}</div>
                ))}
              </div>
              <Line options={optionsGauss} data={dataGauss} />
            </div>
          </div>
        </Col>

        <Col md={12} lg={12} sm={12} className="text-center mb-5">
          <Link to="/">
            <button className="btn btn-warning">Go Back</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default Forecast;
