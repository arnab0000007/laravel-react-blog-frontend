import React, { useState } from "react";
import { useParams,useHistory } from 'react-router-dom'
import { useEffect } from "react";
function UpdatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [user_id, setId] = useState("");
    const { id } = useParams()
    const history = useHistory()
    useEffect(() => {
        async function getSinglePost() {
            let result = await fetch(`http://localhost:8000/api/post/${id}`)
            result = await result.json();
            setTitle(result.title)
            setDescription(result.description)
            setId(result.user_id)
        };
        getSinglePost()
    },[id])

    async function UpdatePost(event) {
        event.preventDefault();
        let postDetails = { title, description, user_id };

        let result = await fetch(`http://localhost:8000/api/post/${id}`, {
            method: "PUT",
            body: JSON.stringify(postDetails),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        result = await result.json();
        console.log(result)
        if (result.result) {
            alert(result.result);
            history.push('/')
        } else {
            alert("Something Went Wrong");
        }
    }

    return (
        <div className="col-sm-6 offset-sm-3">
            <h1>Update Post</h1>

            <form onSubmit={UpdatePost}>
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
                       Update
                    </button>
                </div>
            </form>
        </div>
    );
}
export default UpdatePost;

