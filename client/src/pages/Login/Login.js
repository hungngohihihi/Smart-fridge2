import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.scss";
import Swal from "sweetalert2";
//Icons
import EyeIcon from "../../assets/images/EyeIcon";

const Login = ({ isMobile }) => {
  document.title = "FridgeMan - Login";

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password };
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login successful",
          confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
        }).then((result) => {
          if (result.isConfirmed) setSuccess(true);
        });
        if (!response.redirected) {
          return response.json();
        }
        else {
          setUrl = response.url;
        }
        // if (response.redirected) {
        //   window.location.href = response.url;
        // } else {
        //   return response.json();
        // }
      })
      .then((data) => {
        if (data) {
          //setErrorMessage(data.error);
        }
      });
  };

  const handleClickLogin = () => {
    window.location.href = url;
  }
  useEffect(() => {
    if (success) {
      handleClickLogin();
    }
  }, [success]);

  return (
    <div className="login page">
      <section className="login">
        <span className="background-text">Login</span>

        <div className="login-content">
          <h3>Login Form</h3>
          <h1>Login</h1>
          <form
            className="login-form"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <div className="input-container">
              <div className="login-input">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="example@example.com"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="login-input">
                <label htmlFor="password">Password</label>
                <input
                  placeholder="Example123"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                {!isMobile ? (
                  <EyeIcon setShowPass={setShowPass} showPass={showPass} />
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="no-login">
              <p>
                No Login? <Link to="signup">Signup</Link>
              </p>
            </div>

            <div className="button-container">
              <button type="login">login</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
