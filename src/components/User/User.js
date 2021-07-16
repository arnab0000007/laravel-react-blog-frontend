import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

function User() {
  //fetching all users data
  useEffect(() => {
    async function getAllUser() {
      let result = await fetch("http://localhost:8000/api/users");
      result = await result.json();
      setAllUsers(result);
    }
    getAllUser();
  }, []);

  // all the state
  const [allUsers, setAllUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(3);

  //getting value from local storage
  useEffect(() => {
    const perPage = JSON.parse(localStorage.getItem("perPage"));
    const query = JSON.parse(localStorage.getItem("query"));
    const page = JSON.parse(localStorage.getItem("page"));
    setSearchQuery(query ? query : "");
    setCurrentPage(page ? page : 1);
    setUsersPerPage(perPage ? perPage : 3);
  }, []);

  useEffect(() => {
    setSearchUser(search(allUsers));
  }, [searchQuery, allUsers]);

  function changeHandler(e) {
    setCurrentPage(1);
    setSearchQuery(e.target.value.toLowerCase());
    localStorage.setItem("query", JSON.stringify(e.target.value.toLowerCase()));
  }
  function pageChangeHandler(e) {
    localStorage.setItem("perPage", JSON.stringify(e.target.value));
    setCurrentPage(1);
    setUsersPerPage(e.target.value);
  }

  function search(rows) {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(searchQuery) > -1 ||
        row.email.toLowerCase().indexOf(searchQuery) > -1 ||
        row.website.toLowerCase().indexOf(searchQuery) > -1
    );
  }

  //for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchUser.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const perPage = [];
  for (let i = 1; i <= allUsers.length; i++) {
    perPage.push(i);
  }

  function paginate(pageNumber) {
    localStorage.setItem("page", JSON.stringify(pageNumber));
    setCurrentPage(pageNumber);
  }
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  function currUser(user) {
    return user.slice(indexOfFirstUser, indexOfLastUser);
  }

  return (
    <div className="col-sm-6 offset-sm-3">
      <label className="mr-2"> Per Page </label>
      <select
        name="page"
        className="mr-2"
        onChange={(e) => pageChangeHandler(e)}
      >
        {perPage.map((index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => changeHandler(e)}
        placeholder="Search here..."
        className="mb-3"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name </th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {currUser(searchUser).map((row) => (
            <tr key={row.id}>
              <td>
                <Link to={`/user/profile/${row.id}`}>{row.name}</Link>{" "}
              </td>
              <td>{row.email}</td>
              <td>{row.website}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default User;
