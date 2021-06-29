import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";

function AddPost() {
    const {  loggedInUser } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
 

    async function addPost(event) {
        event.preventDefault();
        let postDetails = { title, description, user_id: loggedInUser.id };
  

        let result = await fetch("http://localhost:8000/api/posts", {
            method: "POST",
            body: JSON.stringify(postDetails),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        result = await result.json();
        if (result.title) {
            alert("Post Created Successfully");
        } else {
            alert("Plsease Provide All Data Correctly");
        }
    }

    return (
        <div className="col-sm-6 offset-sm-3">
            <h1>Add A Post</h1>

            <form onSubmit={addPost}>
                <div className="form-group">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        placeholder="Enter Post Title"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        placeholder="Enter Post Description"
                        required
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Add Post
                    </button>
                </div>
            </form>
        </div>
    );
}
export default AddPost;
