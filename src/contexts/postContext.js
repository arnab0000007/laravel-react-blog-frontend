import React, { createContext, useState, useEffect } from "react";
export const PostContext = createContext();
function PostContextProvider(props) {
    const [allPost, setAllPost] = useState([]); 
    useEffect(() => {
           async function getAllPost() {
            let result = await fetch("http://localhost:8000/api/posts")
            result = await result.json();
            setAllPost(result)
        }
        getAllPost()  
    }, []);


    return (
        <PostContext.Provider value={{ allPost,setAllPost  }}>
            {props.children}
        </PostContext.Provider>
    );
}
export default PostContextProvider;
