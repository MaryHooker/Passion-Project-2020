import React, { Component } from 'react';
// Tools
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// Home Page imports
import CustomerRegister from './CustomerRegister';
import Login from './Login';
////////// Admin imports ///////////
//Home
import AdminHome from './Admin/Home/AdminHome';
//Admin
import ViewAllAdmin from './Admin/Users/Admin/ViewAllAdmin';
import ViewOneAdmin from './Admin/Users/Admin/ViewOneAdmin';
//Dreamers
import Dreamers from './Admin/Users/Dreamers/Dreamers';
import EditDreamer from './Admin/Users/Dreamers/EditDreamer';
import DreamersDreams from './Admin/Dreams/DreamersDreams';
//Meanings
import ViewAllMeanings from './Admin/Meanings/ViewAllMeanings';
import CreateMeaning from './Admin/Meanings/CreateMeaning';
import ViewOneMeaning from './Admin/Meanings/ViewOneMeaning';
////////// Customer imports /////////
//Home
import CustomerHome from './Customer/Home/CustomerHome';
//Dreamer
import ViewOneDreamer from './Admin/Users/Dreamers/ViewOneDreamer';
//Dreams
import MyDreams from './Customer/Dreams/MyDreams';
import ViewOneDream from './Customer/Dreams/ViewOneDream';
import EditMeaning from './Admin/Meanings/EditMeaning';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Authorization for user to access certain components
      token: "",
      //Payload to hold onto
      tokenUser: {
        id: "",
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
    //sanity
    console.log(this.state);
    const response = await fetch('/dreamers/verify', {
      method: "POST",
      headers: {
        "Authorization": this.state.token
      }
    });
    const json = await response.json();
    //sanity
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
      //sanity
      console.log(this.state.tokenUser);
    }
  };

  // logout the user
  logOut = () => {
    //set token to empty
    this.setState({
      token: ""
    });
    //brute force redirect back to home
    window.location = "/"
  };

  render() {
    //variables made for value of state to be conditionally rendered
    let register,
      login,
      logout,
      homePage;
    //If the customer or admin have succesfully logged in and been assigned a token, hide the register, login components & show the the logout component
    if (this.state.token) {
      register = <Link to='/register' className='noLine' hidden>Register</Link>
      login = <Link to='/login' className='noLine' hidden>Login</Link>
      logout = <button onClick={this.logOut} className='logoutStyle'>Logout</button>
      //If the role of the user logged in is Admin, render the Admin's homepage
      if (this.state.tokenUser.role === "Admin") {
        homePage = "/adminHome";
      //Else if the role of the user logged in is Customer, render the Customer's homepage
      } else if (this.state.tokenUser.role === "Customer") {
        homePage = "/customerHome";
      }
    //Else if the user is not logged in, render the register, login components and hide the logout
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

                  { /*/////// Register & Login Routes ///////*/ }
                  <div>
                  <Route path='/register' exact component={() => <CustomerRegister/> }/>
                  </div>
                  <div>
                  <Route path='/login' exact component={() => <Login getToken={this.getToken} tokenUser={this.state.tokenUser} token={this.state.token}/> }/>
                  </div>
                 

                { /* Routes */ }
                

                { /*//////// Home ////////*/ }
                { /* Admin  */ }
                <Route path='/adminHome' exact component={() => <AdminHome tokenUser={this.state.tokenUser}/> }/>
                { /* Customer */ }
                <Route path='/customerHome' exact component={() => <CustomerHome tokenUser={this.state.tokenUser}/> }/>

                { /* ///////// Admin /////////*/ }
                <Route path='/admin/view/all' exact component={() => <ViewAllAdmin/> }/>
                <Route path='/admin/view/one/:email' exact component={(props) => <ViewOneAdmin {...props} /> }/>


                { /*/////// Dreamers ///////*/ }
                  { /* Admin */ }
                  <Route path='/view/dreamers' exact component={() => <Dreamers/> }/>
                  <Route path='/dreamers/view/one/:email' exact component={(props) => <ViewOneDreamer {...props} /> }/>
                  <Route path='/dreamers/edit/:email' exact component={(props) => <EditDreamer {...props}/>}/>
                  { /* Customer */ }
                
                { /*/////// Dreams ///////*/ }
                   { /* Admin */ }
                   <Route path='/dreamers/dreams/view/:id' exact component={(props) => <DreamersDreams {...props}/>}/>
                   
                   { /* Customer */ }
                   <Route path='/myDreams' exact component={() => <MyDreams tokenUser={this.state.tokenUser}/> }/>
                   <Route path='/dreamers/dreams/view/one/:id' exact component={() => <ViewOneDream/>}/>

                  { /*//////// Meanings ////////*/ }
                  { /* Admin */ }
                  <Route path='/view/meanings' exact component={() => <ViewAllMeanings/>}/>
                  <Route path='/create/meaning' exact component={() => <CreateMeaning/> }/>
                  <Route path='/meanings/view/one/:id' exact component={(props) => <ViewOneMeaning {...props} /> }/>
                  <Route path='/meanings/edit/:id' exact component={(props) => <EditMeaning {...props}/> }/>
             
                </Router>
            </div>
      );
  }
}

export default AppContainer;