import React, { useState, useContext } from "react";
import { Link  } from "react-router-dom";
import { PostContext } from '../../contexts/postContext';
function Home() {
    const { allPost } = useContext(PostContext)
    const [visible, setVisible] = useState(10);
    const loadMore = () => {
        setVisible((prevValue) => prevValue + 10);
    }
    return (
        <div className="col-sm-6 offset-sm-3 text-center">
            <h5>All Post</h5>
            {allPost.slice(0, visible).map((post) => (
                <div key={post.id} className="card mb-3 mt-3">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>Post Title :{post.title}</h3>
                        </div>
                        <div className="card-text">
                            <h6>Author: {post.user.username}</h6>
                            <hr />
                            <p>{post.description}</p>
                        </div>
                        <Link to={"/single/post/" + post.id} className="btn btn-sm btn-secondary mr-2">
                                    See details
                                </Link>
                    </div>
                </div>)
            )}
    
            <button onClick={loadMore} className="btn btn-secondary">Load More</button>
        </div>
    );
}
export default Home;
