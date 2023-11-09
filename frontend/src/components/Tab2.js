import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userService from "../services/user";

const Tab2 = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [children, setChildren] = useState([]);
  const [ageRangeFilter, setAgeRangeFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [numChildrenFilter, setNumChildrenFilter] = useState("");
  const [filteredClasses, setFilteredClasses] = useState(classes);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    async function fetchData1() {
      const response2 = await userService.getUnassignedChildMod();
      setChildren(response2.data);
    }
    fetchData1();

    async function fetchData() {
      const response = await userService.getAllClassesMod();
      setClasses(response.data);
      setFilteredClasses(response.data);
    }
    fetchData();
  }, []);

  const handleAgeRangeFilterChange = (e) => {
    setAgeRangeFilter(e.target.value);
    filterClasses(e.target.value, serviceFilter, numChildrenFilter);
  };

  const handleServiceFilterChange = (e) => {
    setServiceFilter(e.target.value);
    filterClasses(ageRangeFilter, e.target.value, numChildrenFilter);
  };

  const handleNumChildrenFilterChange = (e) => {
    setNumChildrenFilter(e.target.value);
    filterClasses(ageRangeFilter, serviceFilter, e.target.value);
  };

  const filterClasses = (ageRange, service, numChildren) => {
    let filtered = classes;
    if (ageRange) {
      filtered = filtered.filter((c) => c.ageRange === ageRange);
    }
    if (service) {
      filtered = filtered.filter((c) => c.service === service);
    }
    if (numChildren) {
      filtered = filtered.filter(
        (c) => c.numChildren === parseInt(numChildren)
      );
    }
    setFilteredClasses(filtered);
  };

  const handleAssignClass = (c) => {
    if (selectedChild && selectedChild.status === "UnAssigned") {
      userService.postAssignClass(selectedChild.id, c.id);
      alert(`Assigned ${selectedChild.firstName} to ${c.name}`);
      setSelectedChild(null);
    } else {
      alert("Please select an UnAssigned child to assign to a class");
    }
  };

  const handleSelectChild = (c) => {
    setSelectedChild(c);
  };

  return (
    <div className="container">
      <h2>Donate</h2>
      <div className="row mb-3">
        <div className="col-sm-3">
          <label htmlFor="ageRangeFilter" className="form-label">
            Age Range:
          </label>
          <select
            id="ageRangeFilter"
            className="form-select"
            value={ageRangeFilter}
            onChange={handleAgeRangeFilterChange}
          >
            <option value="">All</option>
            <option value="2-4">2-4 years old</option>
            <option value="4-6">4-6 years old</option>
          </select>
        </div>
        <div className="col-sm-3">
          <label htmlFor="serviceFilter" className="form-label">
            Service:
          </label>
          <select
            id="serviceFilter"
            className="form-select"
            value={serviceFilter}
            onChange={handleServiceFilterChange}
          >
            <option value="">Choose</option>
            <option value="Full Time">Ghi Lô</option>
            <option value="Part Time">Ghi Đề</option>
          </select>
        </div>
        <div className="col-sm-3">
          <label htmlFor="numChildrenFilter" className="form-label">
            Số tiền:
          </label>
          <input className="text" placeholder="money"></input>
        </div>
        <div className="col-sm-3">
          <button
            type="submit"
            onClick={() => navigate("/mod")}
            className="btn btn-primary mt-3"
          >
            Donate
          </button>
        </div>
      </div>
      <div className="row">
        {filteredClasses.map((c) => (
          <div className="col-sm-3 mb-3" key={c.id}>
            <div className="card">
              <div className="card-body">
                <Link to={`/class/${c.id}`} className="card-title">
                  {c.name}
                </Link>
                <p className="card-text">
                  Age Range: {c.ageRange}
                  <br />
                  Service: {c.service}
                  <br />
                  Number of Children: {c.numChildren}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAssignClass(c)}
                >
                  Assign Child
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />

      <table className="table">
        <tbody>
          {children.map((c) => (
            <tr key={c.id}>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.dob}</td>
              <td>{c.status}</td>
              <td>
                {c.status === "UnAssigned" ? (
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleSelectChild(c)}
                    />
                  </div>
                ) : (
                  <span className="text-muted">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tab2;
