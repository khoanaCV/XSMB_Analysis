import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const Doctor = () => {
  const [countSparseArray, setCountSparseArray] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/sparses/last_appearing_loto")
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
    <section className="doctor-wrapper">
      <h1 className="my-5">Lottery Haven't Come Out For A Long Time</h1>
      <div className="row">
        {[0, 1, 2, 3].map((tableIndex) => (
          <div key={tableIndex} className="col-md-6">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lottery</th>
                  <th>Count date</th>
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
                          <td>{specialPrize[1].count} days</td>
                        </tr>
                      )
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
