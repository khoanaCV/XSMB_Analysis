import React, { useEffect, useState } from "react";
import userService from "../services/user";

const Tab3 = () => {
  const [bookedServices, setBookedServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await userService.getAllBooking();
      setBookedServices(response.data);
    }
    fetchData();
  }, []);

  const handleApprove = (c) => {
    const updatedServices = bookedServices.map((service) =>
      service.id === c.id ? { ...service, status: "Approved" } : service
    );
    userService
      .postApproveBooking(c)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setBookedServices(updatedServices);
  };

  const handleDeny = (id) => {
    const updatedServices = bookedServices.map((service) =>
      service.id === id ? { ...service, status: "Denied" } : service
    );
    userService
      .postApproveBooking(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setBookedServices(updatedServices);
  };

  return (
    <div className="flex justify-center mb-4">
      <h1> Donate List </h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Service Name</th>
            <th className="px-4 py-2">Account Name</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Date Donate</th>
            <th className="px-4 py-2">Money</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedServices.map((service) => (
            <tr key={service.id}>
              <td className="border px-4 py-2">{service.id}</td>
              <td className="border px-4 py-2">{service.serviceName}</td>
              <td className="border px-4 py-2">{service.accountName}</td>
              <td className="border px-4 py-2">{service.childName}</td>
              <td className="border px-4 py-2">{service.date}</td>
              <td className="border px-4 py-2">{service.status}</td>
              <td className="border px-4 py-2">
                {service.status === "Pending" && (
                  <div>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleApprove(service)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeny(service.id)}
                    >
                      Deny
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tab3;
