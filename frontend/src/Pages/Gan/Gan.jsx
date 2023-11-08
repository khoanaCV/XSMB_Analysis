import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const Gan = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [choosenNumber, setChoosenNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [min, setMin] = useState("");
  const [countSparseArray, setCountSparseArray] = useState([]);
  const { REACT_APP_URL_SERVER } = process.env;

  // const handleInputChange = (event) => {
  //     event.preventDefault();
  //     const { name, value } = event.target;
  //     if (name === "choosenNumber") {
  //         setChoosenNumber(value);
  //     } else if (name === "startDate") {
  //         setStartDate(value);
  //     } else if (name === "endDate") {
  //         setEndDate(value);
  //     } else if (name === "min") {
  //         setMin(value);
  //     }
  // };

  const handleChooseNumber = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setChoosenNumber(value);
  };

  const handleStartDate = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setStartDate(value);
  };

  const handleEndDate = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setEndDate(value);
  };

  const handleMin = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setMin(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const choosenNumberValue = form.elements.choosenNumber.value;
    const startDateValue = form.elements.startDate.value;
    const endDateValue = form.elements.endDate.value;
    const minValue = form.elements.min.value;
    setChoosenNumber(choosenNumberValue);
    setStartDate(startDateValue);
    setEndDate(endDateValue);
    setMin(minValue);
    console.log(form.elements.min.value, minValue, typeof min);
    // Kiểm tra điều kiện trước khi gửi yêu cầu POST
    // if (choosenNumber !== "" && startDate !== "" && endDate !== "" && min !== "") {
    // Gửi yêu cầu POST đến backend với các biến đã được cập nhật
    axios
      .post(REACT_APP_URL_SERVER + "/sparses/gan_time/findOne", {
        choosenNumber: choosenNumberValue,
        startDate: startDateValue,
        endDate: endDateValue,
        min: minValue,
      })
      .then((res) => setCountSparseArray(res.data?.data))
      .catch((err) => console.log(err));
    // }
  };
  console.log(countSparseArray);

  const get_day_of_time = (d1, d2) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
  };

  const ganArray = [];
  countSparseArray?.map((item, key) => {
    let birthday = new Date(item.lastDate);

    let today = new Date(item.newDate);
    const time = get_day_of_time(birthday, today);
    const formatLastDate = item.lastDate.split("T")[0]; // Lấy phần trước "T"
    const formatNewDate = item.newDate.split("T")[0]; // Lấy phần trước "T"
    const gan = {
      numId: item.numId,
      lastDate: formatLastDate,
      newDate: formatNewDate,
      time: time,
    };
    if (gan.time >= min) {
      ganArray.push(gan);
    }
  });
  console.log(ganArray);
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Thống kê chu kỳ Gan",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const data = context.dataset.data[context.dataIndex];
            const time = ganArray[context.dataIndex].time;
            const newDate = ganArray[context.dataIndex].newDate;
            return `Ngày: ${time} Ngày, Ngày ra: ${newDate}`;
          },
        },
      },
    },
  };
  const labels = ganArray?.map((item) => item.lastDate);
  const data = {
    labels,
    datasets: [
      {
        label: "Ngày",
        data: ganArray?.map((item) => item.time),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const HorizontalBarChart = () => {
    if (ganArray.length != 0) {
      return (
        <div>
          <Bar data={data} options={options} />
        </div>
      );
    }
    return <></>;
  };
  return (
    <section className="gan-wrapper my-8">
      <h1>Thống kê chu kỳ gan</h1>
      <div className="mb-4">
        Đây là công cụ giúp bạn tính các khoảng thời gian không xuất hiện
        (khoảng gan) của một cặp số. Để sử dụng, bạn hãy nhập cặp số cần kiểm
        tra và chọn khoảng thời gian (mặc định là 1 năm gần nhất). Giá trị{" "}
        <b>Min</b> là khoảng gan thấp nhất bạn cần thống kê.
      </div>

      <form className="flex justify-center" onSubmit={handleSubmit}>
        Cặp số:
        <input
          className="border-[1px] border-black ml-1 mr-4 rounded-sm"
          name="choosenNumber"
          onChange={handleChooseNumber}
          size="2"
        />
        Từ:
        <input
          className="border-[1px] border-black ml-1 mr-4 rounded-sm"
          type="date"
          name="startDate"
          onChange={handleStartDate}
          size="10"
        />
        Đến:
        <input
          className="border-[1px] border-black	ml-1 mr-4 rounded-sm"
          type="date"
          name="endDate"
          onChange={handleEndDate}
          size="10"
        />
        Min:{" "}
        <input
          className="border-[1px] border-black ml-1 mr-4 rounded-sm"
          type="text"
          name="min"
          onChange={handleMin}
          size="2"
          title="Số ngày gan nhỏ nhất"
        />
        <Button size="sm" type="submit">
          Thống kê
        </Button>
      </form>
      <div>
        <HorizontalBarChart />
      </div>
    </section>
  );
};

export default Gan;
