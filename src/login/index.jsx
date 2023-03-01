import { Link } from "react-router-dom";
import { LoginAPI } from "../Utils/fetch";

import React from "react";

function Login() {
  let isUserLoggedIn = false;
  try {
    isUserLoggedIn = JSON.parse(localStorage.getItem("user"));
    if (isUserLoggedIn && isUserLoggedIn.id) {
      window.location.href = "http://localhost:3000/store";
    }
  } catch (error) {}

  const login = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("username: ", username);
    console.log("password: ", password);
    LoginAPI(username, password)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log("result: ", result);
        console.log("localStorage: ", localStorage);
        if (result.success) {
          //go to dashboard / home
          localStorage.setItem("user", JSON.stringify(result.userData));
          window.location.href = "http://localhost:3000/store";
        } else {
          // alert user that credentials is invalid
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  return !isUserLoggedIn ? (
    <div className="row row-cols-2">
      <div className="col">
        <img src="./assets/images/Vape-hub.svg" alt="Vapehub-Logo" />
      </div>
      <form className="justify-content-center align-items-center">
        <div className="form-group ">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group my-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-lg w-75 btn-primary"
          onClick={login}
        >
          Login
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default Login;
