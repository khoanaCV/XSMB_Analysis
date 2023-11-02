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
        const data = Object.entries(response.data.data);
        // Sắp xếp mảng theo thứ tự ngày lớn nhất
        data.sort((a, b) => b[1] - a[1]);
        setSpecialPrizes(data.slice(0, 20)); // Lấy 20 số đầu tiên
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching special prizes data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="service">
      <h1>Number of days that special prizes have not been released</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {[0, 1, 2, 3].map((tableIndex) => (
            <div key={tableIndex} className="col-md-6">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Special Prize</th>
                    <th>Count date</th>
                  </tr>
                </thead>
                <tbody>
                  {specialPrizes
                    .slice(tableIndex * 5, tableIndex * 5 + 5)
                    .map((specialPrize, index) => (
                      <tr key={index}>
                        <td>{specialPrize[0]}</td>
                        <td>{specialPrize[1]} day</td>
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
