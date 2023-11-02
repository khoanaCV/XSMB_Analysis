import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const Service = () => {
  const [specialPrizes, setSpecialPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9999/special/special-long-to-long")
      .then((response) => {
        setSpecialPrizes(Object.entries(response.data.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching special prizes data: ", error);
        setLoading(false);
      });
  }, []);

  const chunkSize = 25;
  const chunkedArrays = [];

  for (let i = 0; i < specialPrizes.length; i += chunkSize) {
    chunkedArrays.push(specialPrizes.slice(i, i + chunkSize));
  }

  return (
    <section className="service">
      <h1>Số ngày mà các giải đặc biệt lâu chưa ra</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {chunkedArrays.map((chunkedData, tableIndex) => (
            <div key={tableIndex} className="col-md-6">
              <h2>Bảng {tableIndex + 1}</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Special Prize</th>
                    <th>Count date</th>
                  </tr>
                </thead>
                <tbody>
                  {chunkedData.map((specialPrize, index) => (
                    <tr key={index}>
                      <td>{specialPrize[0]}</td>
                      <td>{specialPrize[1]} ngày</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Service;
