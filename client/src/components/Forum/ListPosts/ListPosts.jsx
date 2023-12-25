import React from "react";

const ListPosts = ({ 
    posts, 
    // getPosts, 
    // setPosts, 
    isMobile }) => {
   
    
    const MobileList = () => {
        return (
        <div className="post-list">
            {posts.map((post) => {
            
            return (
                <div className="post-list-item" key={post.post_id}>
                <div className="row-1">
                    <p className="title">{post.title}</p>
                </div>
                <div className="row-2">
                    <p className="content">{post.content}</p>
                    <p className="author">{post.author}</p>
                </div>
                <div className="row-3">
                    <p className="date">{post.date}</p>
                </div>
                
                </div>
            );
            })}
        </div>
        );
    };
    
    const DesktopList = () => {
        return (
        <div className="post-list">
            {posts.map((post) => {

            
            return (
                <div className="post-list-item" key={post.post_id}>
                <div className="row-1">
                    <p className="title">{post.title}</p>
                </div>
                <div className="row-2">
                    <p className="content">{post.content}</p>
                    <p className="author">{post.email}</p>
                </div>
                <div className="row-3">
                    <p className="date">{post.date}</p>
                </div>
                
                </div>
            );
            })}
        </div>
        
        );
    };
    
    return (
        <div className="list-posts">
        {isMobile ? <MobileList /> : <DesktopList />}
        </div>
    );
    }

export default ListPosts;