import React, { Component } from "react";


class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = 
    { name: "", email: "", password: "", role: "Customer"};
  }

  //function to handle changes in input fields and save them in state
  handleInputs = (event)=>{
      this.setState({[event.target.name]:event.target.value})
  }

  //handle submit button
  handleSubmission = async(event) => {
    event.preventDefault();
    //define data to be passed through the body
    let newAdmin = {
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
        role:this.state.role
    }
    //use fetch to import create method from server to register a new customer
    let response = await fetch('/dreamers/register',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            "Content-type":"application/json",
            // "Authorization": this.props.token
        },
        body:JSON.stringify(newAdmin)
    })
    let json = await response.json();

    //sanity
    console.log(`Registration Form ${JSON.stringify(json)}`)
    //Setting redirect to true 
  
    }

  render() {
   
    return (
      <div className='regLogContainer'>
        <div className='formP'>
        <form action="" className='formP'>
          {/* <legend><h3>Register</h3></legend> */}
          <div className='labelPositions'>
            <label htmlFor="name">
              <span>Name </span>{" "}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleInputs}
            />
          </div>
          <div className='labelPositions'>
            <label htmlFor="email">
              <span>Email </span>{" "}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleInputs}
            />
          </div>
          <div className='labelPositions'>
            <label htmlFor="password">
              <span>Password </span>{" "}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInputs}
            />
          </div>
          <button onClick={this.handleSubmission}>Submit</button>
        </form>
        </div>
      </div>
    );
  }
}

export default CustomerRegister;
