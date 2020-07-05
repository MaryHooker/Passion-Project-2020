import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {Button} from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    // set the states empty intially
    this.state = {
      email: "",
      password: "",
      token: "",
      redirect: false,
      emailError:"",
      passwordError:""
    };
  }
  //handle changes in the input fields
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //function to validate input fields
  validate = () => {
   let emailError = "";
   let passwordError = "";
//if email does not incluse @, set value to invalid email
   if(!this.state.email.includes('@')){
     emailError = 'invalid email'
   }

   //if email is empty
   if(!this.state.email){
     emailError = 'email cannot be blank'
   }

   //if password is empty
   if(!this.state.password){
     passwordError = 'password cannot be blank'
   }

   //if there is an email or password error, set state to our message and return false
   if(passwordError || emailError){
     //could be emailError:emailError but if the 
    this.setState({emailError, passwordError});
    return false;
  }



   //if you dont hit any errors in validate, return true
   return true;
  }

  //Sends user input to server which should return a token
  handleSubmission = async (event) => {
    event.preventDefault();
    //calling function to validate
    const isValid = this.validate();
    if(isValid){
      console.log(this.state)
    }
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
    // if (json.error) {
    //   window.alert(json.error);
    // }
    this.setState({ token: json.token });
    console.log(this.state.token);
    this.props.getToken(json.token);

  };

  render() {
    if (this.props.tokenUser.name) {
      if (this.props.tokenUser.role === "Admin") {
        return <Redirect to='/adminHome' />
      } else if (this.props.tokenUser.role === "Customer") {
        return <Redirect to='/customerHomeCopy' />
      }}
    return (
      <div>
          {/* <h5>Login</h5> */}
          <form >
            <div className='labelPositions'>
              {/* <label htmlFor="email" className='loginPage'><span>Email</span> </label> */}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={this.state.email}
                className="form-control"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 13, color:"red"}}>{this.state.emailError}</div>
            </div>
            <div className='labelPositions'>
              {/* <label htmlFor="password" className='loginPage'><span>Password</span> </label> */}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={this.state.password}
                className="form-control"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 13, color:"red"}}>{this.state.passwordError}</div>
            </div>
            <div>
              <Button onClick={this.handleSubmission} className='loginButton'>Submit</Button>
            </div>
          </form>
      </div>
    );
  }
}
