import React, { useContext,useEffect,useState } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "../../contexts/userContext";

function Profile() {
    const { loggedInUser } = useContext(UserContext);
    const [usersPost, setUsersPost] = useState([]);

    useEffect(() => {
        async function getUsersPost() {
            let result = await fetch(`http://localhost:8000/api/posts/${loggedInUser.id}`)
            result = await result.json();
            setUsersPost(result)
        }
        getUsersPost()
    }, [loggedInUser.id]);

    async function deletePost(id) {
        let result = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: 'DELETE'
        });
        result = await result.json();
        if (result.error) {
            alert(result.result)
        }
    }

    return (
        <div>
            <div className="col-sm-6 offset-sm-3 text-center">
                <h4 className="text-center text-primary">Welcome {loggedInUser.name}</h4>

                {usersPost.map((post) => (
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
                                <Link to={"/single/post/" + post.id} className="btn btn-sm btn-secondary mr-2">
                                    See details
                                </Link>
                                <Link to={"/update/post/" + post.id} className="btn btn-sm btn-secondary mr-2">
                                    Update
                                </Link>
                                <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger">
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Profile;
