import React, { Component } from "react";
import { Redirect } from 'react-router-dom';


class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      role: "Customer",
      redirect: false,
      nameError: "",
      emailError: "",
      passwordError: "",
    };
  }

  //function to handle changes in input fields and save them in state
  handleInputs = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  //function to validate input fields
  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    //If name is empty
    if (!this.state.name) {
      nameError = "name cannot be blank"
    }

    //if email does not incluse @, set value to invalid email
    if (!this.state.email.includes('@')) {
      emailError = 'invalid email';
      this.setState({email:""}); 
    }

    //if email is empty
    if (!this.state.email) {
      emailError = 'email cannot be blank'
    }

    //if password is empty
    if (!this.state.password) {
      passwordError = 'password cannot be blank'
    }

    //if there is an email or password error, set state to our message and return false
    if (passwordError || emailError || nameError) {
      //could be emailError:emailError but if the 
      this.setState({
        nameError,
        emailError,
        passwordError
      });
      return false;

    }
    //if error, do not redirect
    this.setState({
      redirect: false
    })
  }

  //handle submit button
  handleSubmission = async(event) => {
    event.preventDefault();
    //calling function to validate
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state)
    }
    //define data to be passed through the body
    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    }
    //use fetch to import create method from server to register a new customer
    let response = await fetch('/dreamers/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/json",
      // "Authorization": this.props.token
      },
      body: JSON.stringify(newUser)
    })
    let json = await response.json();

    //sanity
    console.log(`Registration Form ${JSON.stringify(json)}`)
    //Setting redirect to true 
    this.setState({
      redirect: true
    })

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
       
        <form>
          { /* <legend><h3>Register</h3></legend> */ }
          <div className='labelPositions'>
            <label htmlFor="name">
              <span>Name </span>{" "}
            </label>
            <input
      type="text"
      name="name"
      id="name"
      placeholder='name'
      value={this.state.name}
      onChange={this.handleInputs}
      />
                    <div style={{
        fontSize: 13,
        color: "red"
      }}>{this.state.nameError}</div>

          </div>
          <div className='labelPositions'>
            <label htmlFor="email">
              <span>Email </span>{" "}
            </label>
            <input
      type="email"
      name="email"
      id="email"
      placeholder="email"
      value={this.state.email}
      onChange={this.handleInputs}
      required={true}
      />
                    <div style={{
        fontSize: 13,
        color: "red"
      }}>{this.state.emailError}</div>

          </div>
          <div className='labelPositions'>
            <label htmlFor="password">
              <span>Password </span>{" "}
            </label>
            <input
      type="password"
      name="password"
      id="password"
      placeholder='password'
      value={this.state.password}
      onChange={this.handleInputs}
      />
                    <div style={{
        fontSize: 13,
        color: "red"
      }}>{this.state.passwordError}</div>

          </div>
          <button onClick={this.handleSubmission}>Submit</button>
        </form>
      </div>
      );
  }
}

export default CustomerRegister;
