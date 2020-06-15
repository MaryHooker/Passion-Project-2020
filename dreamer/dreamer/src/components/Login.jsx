import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    // set the states empty intially
    this.state = {
      email: "",
      password: "",
      token: "",
      redirect: false,
    };
  }
  //handle changes in the input fields
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //Sends user input to server which should return a token
  handleSubmission = async (event) => {
    event.preventDefault();
    let user = { email: this.state.email, password: this.state.password };
    let response = await fetch("/dreamers/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let json = await response.json();
    console.log(json);
    if (json.error) {
      window.alert(json.error);
    }
    this.setState({ token: json.token });
    console.log(this.state.token);
    this.props.getToken(json.token);
  };

  render() {
    if (this.props.tokenUser.name) {
      if (this.props.tokenUser.role === "Admin") {
        return <Redirect to='/adminHome' />
      } else if (this.props.tokenUser.role === "Customer") {
        return <Redirect to='/customerHome' />
      }}
    return (
      <div>
          {/* <h5>Login</h5> */}
          <form >
            <div className='labelPositions'>
              <label htmlFor="email" className='loginPage'><span>Email</span> </label>
              <input
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className='labelPositions'>
              <label htmlFor="password" className='loginPage'><span>Password</span> </label>
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button onClick={this.handleSubmission}>Submit</button>
            </div>
          </form>
      </div>
    );
  }
}
