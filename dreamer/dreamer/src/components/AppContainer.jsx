import React, { Component } from 'react';
// Tools
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// Home Page imports
import CustomerRegister from './CustomerRegister';
import Login from './Login/Login';
// Admin imports
import AdminHome from './Admin/AdminHome';
import Dreamers from './Admin/Dreamers/Dreamers';
// Customer imports
import CustomerHome from './Customer/CustomerHome';
import ViewOneDreamer from './Admin/Dreamers/ViewOneDreamer';
import MyDreams from './Customer/MyDreams';
import EditDreamer from './Admin/Dreamers/EditDreamer';


class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      tokenUser: {
        id:"",
        name: "",
        email: "",
        role: ""
      },
    }
  }

  // fetch method to verify the user on login and assign them a token to give and recieve payload to hold onto/use
  getToken = async (token) => {
    this.setState({
      token: token
    })
    console.log(this.state);
    const response = await fetch('/dreamers/verify', {
      method: "POST",
      headers: {
        "Authorization": this.state.token
      }
    });
    const json = await response.json();
    console.log(json);
    if (json.error) {
      // window.alert(json.error);
    } else {
      this.setState({
        tokenUser: {
          id: json.message.id,
          name: json.message.name,
          email: json.message.email,
          role: json.message.role
        },
      });
      console.log(this.state.tokenUser);
    }
  };

  // logout the user
  logOut = () => {
    this.setState({
      token: ""
    });
    window.location = "/"
  };

  render() {
    let register,
      login,
      logout, homePage;
    if (this.state.token) {
      if (this.state.tokenUser.role === "Admin") {
        homePage = "/adminHome";
    } else if (this.state.tokenUser.role === "Customer") {
        homePage = "/customerHome";
    
    }
      register = <Link to='/register' className='noLine' hidden>Register</Link>
      login = <Link to='/login' className='noLine' hidden>Login</Link>
      logout = <button onClick={this.logOut} className='logoutStyle'>Logout</button>
    } else {
      register = <Link to='/register' className='noLine' >Register</Link>
      login = <Link to='/login' className='noLine' >Login</Link>
      logout = <button hidden className='logoutStyle'>Logout</button>
    }
    return (
      <div>
        <Router>
          <div className='homeContainer'>
                <div className='homeTitle'>
                 <Link to={homePage} className='noLineHome'>Dreamer</Link>
                </div>
                  { /* Home Links */ }
                  <div className='registerLink'>
                  {register}
                  </div>
                  <div className='logoutButton'>
                  {logout}
                  </div>
                  <div className='loginLink'>
                  {login}
                  </div>
                  </div>
                  <br/>
                  <br/>
                  <br/>

                  { /* Register/Login Routes*/ }
                  <div>
                  <Route path='/register' exact component={() => <CustomerRegister/> }/>
                  </div>
                  <div>
                  <Route path='/login' exact component={() => <Login getToken={this.getToken} tokenUser={this.state.tokenUser} token={this.state.token}/> }/>
                  </div>
                 

                { /* Routes */ }
                

                { /* Admin Routes */ }
                <Route path='/adminHome' exact component={() => <AdminHome/> }/>
                { /* Dreamers/Customers */ }
                <Route path='/view/dreamers' exact component={() => <Dreamers/> }/>
                <Route path='/dreamers/view/one/:email' exact component={(props) => <ViewOneDreamer {...props} /> }
                />
                <Route path='/dreamers/edit' exact component={() => <EditDreamer/>}/>


                { /* Customer Routes */ }
                <Route path='/customerHome' exact component={() => <CustomerHome/> }/>
                {/* Dreams */}
                <Route path='/myDreams' exact component={() => <MyDreams tokenUser={this.state.tokenUser}/> }/>
               
                </Router>
            </div>
      );
  }
}

export default AppContainer;