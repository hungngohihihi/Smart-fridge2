import React, { useState, useEffect } from "react";
import ListUsers from "../../components/Forum/ListUser";
// import AddStock from "../../components/Stock/AddStock";
import SearchForum from "../../components/Forum/SearchForum";
import pasta from "./pasta.jpg";
import pho from "./pho.jpg";
import "./forum.scss";

const Forum = ({ isMobile, username }) => {
  document.title = "FridgeMan - Forum";

  const [addVisible, setAddVisibility] = useState(false);
  const [searchVisible, setSearchVisibility] = useState(false);
  // const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const getUsers = async () => {
    await fetch("/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="forums page">
      <div className="forum-content">
        <h3>{username}'s</h3>
        <h1>Post list</h1>

        <div className="navigation-buttons">
          <button
            onClick={() => {
              setSearchVisibility(true);
            }}
          >
            Search Post
          </button>

          <button
            onClick={() => {
              setAddVisibility(true);
            }}
            style={{ marginLeft: "auto" }}
          >
            Create Post
          </button>
        </div>
      </div>

      <div className="forum-post">
        {/* <AddStock
          locationList={locationList}
          getStocks={getStocks}
          setAddVisibility={setAddVisibility}
          addVisible={addVisible}
        /> */}

        <SearchForum
          // name={name}
          // location={location}
          // setName={setName}
          // setLocation={setLocation}
          // locationList={locationList}
          // setStocks={setStocks}
          setSearchVisibility={setSearchVisibility}
          searchVisible={searchVisible}
        />
        <div className="user-post">
          <SearchForum
            // name={name}
            // location={location}
            // setName={setName}
            // setLocation={setLocation}
            // locationList={locationList}
            // setStocks={setStocks}
            setSearchVisibility={setSearchVisibility}
            searchVisible={searchVisible}
          />
          <ListUsers
            // locationList={locationList}
            // getUsers={getUsers}
            users={users}
            // setUsers={setUsers}
            isMobile={isMobile}
          />
        </div>
        <div className="list-post">
          {/* <ListPosts
          locationList={locationList}
          getPosts={getPosts}
          posts={posts}
          setPosts={setPosts}
          isMobile={isMobile}
        /> */}
          <div>
            <header>
              <h1>Khám phá thế giới của đồ ăn ngon</h1>
            </header>

            <article>
              <h2>Phở Việt Nam</h2>
              <img src={pho} alt="Phở Việt Nam" />
              <p>
                Phở là một món ăn truyền thống của Việt Nam, nổi tiếng với hương vị thơm ngon và đầy đủ chất dinh dưỡng.
                Một tô phở bao gồm nước dùng thơm ngon, bánh phở mềm mại và các loại thịt như bò, gà hoặc nước luộc.
              </p>
            </article>

            <article>
              <h2>Pasta Ý</h2>
              <img src= {pasta} alt="Pasta Ý" />
              <p>
                Pasta là một món ăn truyền thống của Ý, được làm từ bột mỳ và có thể kết hợp với nhiều loại sốt khác nhau.
                Sự đa dạng của pasta là vô tận, từ mì ý, spagetti đến ravioli, tất cả đều có thể thỏa mãn khẩu vị của bạn.
              </p>
            </article>

            <footer>
              <p>Xin chân thành cảm ơn bạn đã thưởng thức đồ ăn qua bài viết của chúng tôi.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
