import React from "react";

const ListPosts = ({
    posts,
    // getPosts, 
    // setPosts, 
    isMobile }) => {


    const MobileList = () => {
        return (
            <div className="post-list-all">
                {posts.map((post) => {
                    return (
                        <div className="post-list">
                            <div className="post-list-item" key={post.post_id}>
                                <div className="row-1">
                                    <h1 className="title">{post.title}</h1>
                                </div>
                                <div className="row-2">
                                    <div className="post-image">
                                        {post.avatar && (
                                            <img
                                                src={post.avatar}
                                                alt="Post avatar"
                                                style={{ maxWidth: "70%" }}
                                            />
                                        )}
                                    </div>
                                    <p className="content">{post.content}</p>
                                </div>
                                <div style={{ fontSize: '10px', textAlign: 'right', marginRight: '0.3em' }} className="row-3">
                                    <i className="author">{post.email}</i>
                                </div>
                                <div className="row-4">
                                    <p className="date">{post.date}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const DesktopList = () => {
        return (
            <div className="post-list-all">
                {posts.map((post) => {
                    return (
                        <div className="post-list">
                            <div className="post-list-item" key={post.post_id}>
                                <div className="row-1">
                                    <h1 className="title">{post.title}</h1>
                                </div>
                                <div className="row-2">
                                    <div className="post-image">
                                        {post.avatar && (
                                            <img
                                                src={post.avatar}
                                                alt="Post avatar"
                                                style={{ maxWidth: "70%" }}
                                            />
                                        )}
                                    </div>
                                    <p className="content">{post.content}</p>
                                </div>
                                <div style={{ fontSize: '10px', textAlign: 'right', marginRight: '0.3em' }} className="row-3">
                                    <i className="author">{post.email}</i>
                                </div>
                                <div className="row-4">
                                    <p className="date">{post.date}</p>
                                </div>
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