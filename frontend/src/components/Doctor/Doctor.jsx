import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import SparsesService from "../../services/sparses.js";

const Doctor = () => {
  const [countSparseArray, setCountSparseArray] = useState([]);

  useEffect(() => {
    getDataCountSparseArray();
  }, []);

  const getDataCountSparseArray = async () => {
    const data = await SparsesService.lastAppearingLoto();
    setCountSparseArray(data);
  };
  return (
    <section className="doctor-wrapper">
      <h1 className="my-5">Lô tô lâu chưa ra</h1>
      <div className="row">
        {[0, 1, 2, 3].map((tableIndex) => (
          <div key={tableIndex} className="col-md-6">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lô tô</th>
                  <th>Số ngày chưa ra</th>
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
                          <td>{specialPrize[1].count} ngày</td>
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
