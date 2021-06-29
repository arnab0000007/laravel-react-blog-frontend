import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function UserProfile() {
  const [user, setUser] = useState([]);
  const [usersPost, setUsersPost] = useState([]);
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usersPost.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const perPage = [];
  for (let i = 1; i <= usersPost.length; i++) {
    perPage.push(i);
  }
  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const indexOfLastUser = currentPage * postsPerPage;
  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  function currPost(post) {
    return post.slice(indexOfFirstUser, indexOfLastUser);
  }
  useEffect(() => {
    async function getUsersPost() {
      let result = await fetch(`http://localhost:8000/api/posts/${id}`);
      result = await result.json();
      setUsersPost(result);
    }
    getUsersPost();
  }, [id]);

  useEffect(() => {
    async function getUser() {
      let result = await fetch(`http://localhost:8000/api/user/${id}`);
      result = await result.json();
      setUser(result);
    }
    getUser();
  }, [id]);
  return (
    <div>
      <div className="col-sm-6 offset-sm-3 text-center">
        <h5 className="text-primary">{user.name}</h5>
        <p>
          <strong>username</strong> {user.username}
        </p>

        <h6>
          <strong>Email:</strong> {user.email}
        </h6>
        <p>
          <strong>website:</strong> {user.website}
        </p>

        {currPost(usersPost).map((post) => (
          <div key={post.id} className="card mb-3 mt-3">
            <div className="card-body">
              <div className="card-title">
                <h3>{post.title}</h3>
              </div>
              <div className="card-text">
                <hr />
                <p>{post.description}</p>
              </div>
              <div className="text-right pt-1 ">
                <Link
                  to={"/single/post/" + post.id}
                  className="btn btn-sm btn-secondary mr-2"
                >
                  See details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {usersPost.length === 0 ? (
          <>
            <h3 className="text-secondary">No Post available for this user</h3>
          </>
        ) : (
          ""
        )}
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
    </div>
  );
}

export default UserProfile;
