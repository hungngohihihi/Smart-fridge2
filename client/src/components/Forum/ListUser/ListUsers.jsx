import React from "react";
// import EditUser from "../EditUser";

const ListUsers = ({
  users,
  // getUsers,
  // setUsers,
  isMobile,
}) => {
  // const deleteUser = async (id) => {
  //   await fetch(`/api/users/${id}`, {
  //     method: "DELETE",
  //   });
  //   getUsers();
  // };

  const getDifDays = (expiration) => {
    let today = new Date();
    let expDate = new Date(expiration);
    return Math.round((expDate - today) / (1000 * 3600 * 24) + 1);
  };

  const MobileList = () => {
    return (
      <div className="user-list">
        {users
          // .sort((a, b) =>
          //   getDifDays(a.expiration) > getDifDays(b.expiration) ? 1 : -1
          // )
          .map((user) => {
            let difDay = getDifDays(user.expiration);
            let color = {
              text: "",
              background: "",
            };
            if (difDay < 30) {
              color.text = "rgba(255,0,0,1)";
              color.background = "rgba(255,0,0,.1)";
            } else if (difDay < 90) {
              color.text = "rgba(255,165,0,1)";
              color.background = "rgba(255,165,0,.1)";
            } else {
              color.text = "rgba(46, 204, 113, 1)";
              color.background = "rgba(46, 204, 113, .1)";
            }
            return (
              <div className="user-list-item" key={user.user_id}>
                <div className="row-1">
                  <p className="email">{user.email}</p>
                  {/* <p className="quantity">{user.quantity}x</p> */}
                </div>
                <div className="row-2">
                  {/* <p className="location">{user.location}</p> */}
                  <p className="expiration">
                    <span
                      style={{
                        color: color.text,
                        backgroundColor: color.background,
                      }}
                    >
                      {difDay} days
                    </span>
                  </p>
                </div>
                <div className="row-3">
                  {/* <Edituser
                    locationList={locationList}
                    user={user}
                    getusers={getusers}
                    users={users}
                    setusers={setusers}
                  /> */}
                  {/* <button
                    onClick={() => {
                      deleteuser(user.user_id);
                    }}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const DesktopList = () => {
    return (
      <table className="user-list">
        <thead>
          <tr>
            <th>Users</th>
            {/* <th>Quantity</th> */}
            {/* <th>Location</th>
            <th>Expiration</th>
            <th>Options</th> */}
          </tr>
        </thead>
        <tbody>
          {users
            // .sort((a, b) =>
            //   getDifDays(a.expiration) > getDifDays(b.expiration) ? 1 : -1
            // )
            .map((user) => {
              let difDay = getDifDays(user.expiration);
              let color = {
                text: "",
                background: "",
              };
              if (difDay < 30) {
                color.text = "rgba(255,0,0,1)";
                color.background = "rgba(255,0,0,.1)";
              } else if (difDay < 90) {
                color.text = "rgba(255,165,0,1)";
                color.background = "rgba(255,165,0,.1)";
              } else {
                color.text = "rgba(46, 204, 113, 1)";
                color.background = "rgba(46, 204, 113, .1)";
              }
              return (
                <tr key={user.user_id}>
                  <td>{user.email}</td>
                  {/* <td>{user.quantity}</td>
                  <td>{user.location}</td> */}
                  {/* <td>
                    <span
                      className="expiration-span"
                      style={{
                        color: color.text,
                        backgroundColor: color.background,
                      }}
                    >
                      {difDay} days
                    </span>
                  </td> */}
                  {/* <td>
                    <Edituser
                      locationList={locationList}
                      user={user}
                      getusers={getusers}
                      users={users}
                      setusers={setusers}
                    />
                    <button
                      onClick={() => {
                        deleteuser(user.user_id);
                      }}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };
  return users.length === 0 ? (
    <h1 className="no-user">No users found.</h1>
  ) : isMobile ? (
    <MobileList />
  ) : (
    <DesktopList />
  );
};

export default ListUsers;
