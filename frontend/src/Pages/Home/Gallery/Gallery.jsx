import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const Doctor = () => {
  const [countSparseArray, setCountSparseArray] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL_SERVER + "/sparses/multi_appearing_loto")
      .then((response) => {
        const data = Object.entries(response.data?.data);
        // Sắp xếp mảng theo thứ tự ngày lớn nhất
        data.sort((a, b) => b[1].count - a[1].count);
        setCountSparseArray(data.slice(0, 20)); // Lấy 20 số đầu tiên
      })
      .catch((error) => {
        console.error("Error fetching special prizes data: ", error);
      });
  }, []);
  console.log(countSparseArray);
  return (
    <section className="gallery-wrapper">
      <h1 className="my-5">Lô Tô Ra Nhiều Trong Tháng</h1>
      <div className="row">
        {[0, 1, 2, 3].map((tableIndex) => (
          <div key={tableIndex} className="col-md-6">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lô</th>
                  <th>Số lần ra</th>
                </tr>
              </thead>
              <tbody>
                {countSparseArray
                  .slice(tableIndex * 5, tableIndex * 5 + 5)
                  ?.map((specialPrize, index) => {
                    {
                      return (
                        <tr key={index}>
                          <td>{specialPrize[0]}</td>
                          <td>{specialPrize[1].count} Lần</td>
                        </tr>
                      );
                    }

                    return <></>;
                  })}
              </tbody>
            </Table>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Doctor;
