import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useEffect } from "react";
function SinglePost() {
  const { loggedInUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getSinglePost() {
      let result = await fetch(`http://localhost:8000/api/post/${id}`);
      result = await result.json();
      setTitle(result.title);
      setDescription(result.description);
    }
    getSinglePost();
  }, [id]);

  useEffect(() => {
    async function getComments() {
      let result = await fetch(`http://localhost:8000/api/comments/${id}`);
      result = await result.json();
      setComments(result);
    }
    getComments();
  }, [id]);
  async function addComment(event) {
    event.preventDefault();
    let comment_body = { comment, post_id: id, user_id: loggedInUser.id };

    let result = await fetch("http://localhost:8000/api/comment", {
      method: "POST",
      body: JSON.stringify(comment_body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (result.result) {
      setComment("");
    }
  }
  return (
    <div className="col-sm-6 offset-sm-3">
      <h5>Post Details</h5>
      <div className="card mb-3 mt-3">
        <div className="card-body">
          <div className="card-title">
            <h3>{title}</h3>
          </div>
          <div className="card-text">
            <hr />
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            {comments.length > 0 ? <h5>All Comments</h5> : <h5>No Comments</h5>}
          </div>

          <div className="card-text">
            <hr />
            {comments.map((comment) => (
              <p key={comment.id}>
                <span>
                  <strong>{comment.user.username}</strong>
                </span>{" "}
                {comment.comment}
              </p>
            ))}
            <hr />
          </div>
          {loggedInUser.isLoggedIn ? (
            <>
              <form onSubmit={addComment}>
                <div className="form-group">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Comment"
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Add Comment
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              please{" "}
              <Link to={"/login"} className="mr-2">
                Log In
              </Link>{" "}
              to comment
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default SinglePost;
