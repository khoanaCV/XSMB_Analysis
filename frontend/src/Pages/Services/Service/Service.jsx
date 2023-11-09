import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const Service = () => {
  const [countSparseArray, setCountSparseArray] = useState([]);
  const getTableSquareClass = (value) => {
    const numberValue = parseInt(value);
    if (numberValue > 0 && numberValue < 2) {
      return "!bg-blue-300";
    } else if (numberValue >= 2 && numberValue < 3) {
      return "!bg-blue-500";
    } else if (numberValue >= 3) {
      return "!bg-red-500";
    }
    return ""; // Trả về chuỗi rỗng nếu không đáp ứng bất kỳ điều kiện nào ở trên
  };

  const [date, setDate] = useState();
  const [days, setDays] = useState();
  const [number, setNumber] = useState(100);

  const handleDate = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setDate(value);
  };

  const handleDays = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setDays(value);
  };

  const handleNumber = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setNumber(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const form = event.target;
    // const dateValue = form.elements.date.value;
    // const daysValue = form.elements.days.value;
    // const numberValue = form.elements.number.value;
    // setNumber(numberValue)
    // setDate(dateValue)
    // setDays(daysValue)
    // console.log(form.elements.number.value, numberValue, typeof number);

    axios
      .post(process.env.REACT_APP_URL_SERVER + "/sparses/date", {
        date,
        days,
        number,
      })
      .then((response) => {
        console.log(Object.entries(response.data?.data));
        const data = Object.entries(response.data?.data);
        data.sort((a, b) => {
          const dateA = new Date(a[1].draw_date);
          const dateB = new Date(b[1].draw_date);

          // So sánh hai đối tượng Date
          return dateB - dateA;
        }); // Sắp xếp mảng theo thứ tự ngày lớn nhất
        if (days) {
          setCountSparseArray(data);
        } else {
          setCountSparseArray(data.slice(0, 100));
        }
      })
      .catch((error) => {
        console.error("Error fetching special prizes data: ", error);
      });
  };

  console.log(countSparseArray);
  const array = countSparseArray.map((count) => count[1]);
  console.log(array);
  const columns = Array.from({ length: 100 }, (_, i) => i.toString());
  return (
    <section className="service-jsx overflow-x-scroll">
      <h1>Thống kê số lần ra của Lô</h1>
      <form className="flex justify-center mb-2" onSubmit={handleSubmit}>
        Số ngày:
        <input
          className="border-[1px] border-black ml-1 mr-4 rounded-sm"
          type="text"
          name="days"
          size="10"
          onChange={handleDays}
        />
        Ngày cuối cùng:
        <input
          className="border-[1px] border-black	ml-1 mr-4 rounded-sm"
          type="date"
          name="date"
          size="10"
          onChange={handleDate}
        />
        Số lượng con số:{" "}
        <input
          className="border-[1px] border-black ml-1 mr-4 rounded-sm"
          type="text"
          name="number"
          size="2"
          onChange={handleNumber}
        />
        <Button size="sm" type="submit">
          Thống kê
        </Button>
      </form>
      <div className="">
        <div className="whitespace-nowrap">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                {Array.from({ length: 100 }, (_, i) => {
                  const twoDigitNumber = i.toString().padStart(2, "0");
                  return <th key={i}>{twoDigitNumber}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {array.map((item, index) => (
                <tr key={index}>
                  <td>{item.draw_date.split("T")[0]}</td>
                  {columns.map((column) => (
                    <td
                      key={column}
                      className={getTableSquareClass(item[column])}
                    >
                      {item[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Service;
