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
import ViewOneDreamer from './Admin/Users/Dreamers/ViewOneDreamer';
//Dreams
import AdminViewOneDream from './Admin/Dreams/AdminViewOneDream';
import Dreams from './Admin/Dreams/Dreams';
//Meanings
import ViewAllMeanings from './Admin/Meanings/ViewAllMeanings';
import CreateMeaning from './Admin/Meanings/CreateMeaning';
import ViewOneMeaning from './Admin/Meanings/ViewOneMeaning';
import EditMeaning from './Admin/Meanings/EditMeaning';
//Posted
import PostedDreams from './Admin/Posted/PostedDreams';
import ViewOnePostedDream from './Admin/Posted/ViewOnePostedDream';
//Spotlight
import SpotlightedDreams from './Admin/SpotLight/SpotlightedDreams';
import ViewOneSpotlightedDream from './Admin/SpotLight/ViewOneSpotlightedDream';
//Links
import ViewAllLinks from './Admin/Knowledge/ViewAllLinks';
import CreateLink from './Admin/Knowledge/CreateLink';
import LinkDetails from './Admin/Knowledge/LinkDetails';
////////// Customer imports /////////
//Home
import CustomerHome from './Customer/Home/CustomerHome';
//Me
import Me from './Customer/Me/Me';
//Dreams
import MyDreams from './Customer/Dreams/MyDreams';
import ViewOneDream from './Customer/Dreams/ViewOneDream';
import EditOwnDream from './Customer/Dreams/EditOwnDream';
import CreateDream from './Customer/Dreams/CreateDream';
import EditMe from './Customer/Me/EditMe';
//Posted
import MyPosted from './Customer/Posted/MyPosted';
import DreamerOnePosted from './Customer/Posted/DreamerOnePosted';
import DreamerViewAllPostedDreams from './Customer/Posted/DreamerViewAllPostedDreams';
//Knowledge
import DreamerKnowledge from './Customer/Knowledge/DreamerKnowledge';
import DreamerViewAllSpotlightedDreams from './Customer/Spotlight/DreamerViewAllSpotlightedDreams';
//Meanings
import DreamerViewAllMeanings from './Customer/Meanings/DreamerViewAllMeanings';
import MeaningsByLetter from './Customer/Meanings/MeaningsByLetter';
import FindingWordMeaning from './Customer/Meanings/FindingWordMeaning';
///////// TESTING
import CustomerHomeCopy from './Customer/Home/CustomerHomeCopy';
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
      homePage,
      credit;
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
        homePage = "/customerHomeCopy";
      }
    //Else if the user is not logged in, render the register, login components and hide the logout/ and credit artist of background picture
    } else {
      register = <Link to='/register' className='noLine' >Register</Link>
      login = <Link to='/login' className='noLine' >Login</Link>
      logout = <button hidden className='logoutStyle'>Logout</button>
      credit = <span>Photo by <a href="https://unsplash.com/@bryangoffphoto?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Bryan Goff</a> on <a href="/s/photos/galaxy?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

    }
    return (
      <div>
        <Router>
          <div className='homeContainer'>
            {/* ToDo: credit artist */}
          {/* <a href="https://pngtree.com/free-backgrounds">free background photos from pngtree.com</a> */}
                <div className='homeTitle'>
                 <Link to={homePage} className='noLineHome'>Dreamer</Link>
                </div>
                <div className='photo'>
                    {credit}
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
                <Route path='/adminHome' exact component={(props) => <AdminHome {...props} tokenUser={this.state.tokenUser}/> }/>
                { /* Customer */ }
                <Route path='/customerHome' exact component={(props) => <CustomerHome {...props} tokenUser={this.state.tokenUser}/> }/>
                {/* TESTING */}
                <Route path='/customerHomeCopy' exact component={(props) => <CustomerHomeCopy {...props} tokenUser={this.state.tokenUser}/> }/>

                { /* ///////// Admin /////////*/ }
                <Route path='/admin/view/all' exact component={() => <ViewAllAdmin/> }/>
                <Route path='/admin/view/one/:email' exact component={(props) => <ViewOneAdmin {...props} /> }/>
                

                { /*/////// Dreamers ///////*/ }
                  { /* Admin */ }
                  <Route path='/view/dreamers' exact component={() => <Dreamers/> }/>
                  <Route path='/dreamers/view/one/:email' exact component={(props) => <ViewOneDreamer {...props} /> }/>
                  <Route path='/dreamers/edit/:email' exact component={(props) => <EditDreamer {...props}/>}/>
                  { /* Customer */ }
                  <Route path='/me' exact component={() => <Me tokenUser={this.state.tokenUser} /> }/>
                  <Route path='/me/edit/:email' exact component={(props) => <EditMe {...props} /> }/>
                
                { /*/////// Dreams ///////*/ }
                   { /* Admin */ }
                   <Route path='/dreamers/dreams/view/:id' exact component={(props) => <DreamersDreams {...props}/>}/>
                   <Route path='/dreams/view/all' exact component={() => <Dreams/>} />
                   <Route path='/dreams/view/one/:id' exact component={(props) => <AdminViewOneDream {...props} /> } />
                   
                   { /* Customer */ }
                   <Route path='/myDreams' exact component={(props) => <MyDreams tokenUser={this.state.tokenUser} {...props} /> }/>
                   <Route path='/dreamers/dreams/view/one/:id' exact component={(props) => <ViewOneDream {...props} />}/>
                   <Route path='/dreamer/dream/edit/:id' exact component={(props) => <EditOwnDream {...props} />}/>
                   <Route path='/create/dream/:email' exact component={(props) => <CreateDream tokenUser={this.state.tokenUser} {...props} />}/>

                  { /*//////// Meanings ////////*/ }
                  { /* Admin */ }
                  <Route path='/view/meanings' exact component={() => <ViewAllMeanings/>}/>
                  <Route path='/create/meaning' exact component={() => <CreateMeaning/> }/>
                  <Route path='/meanings/view/one/:id' exact component={(props) => <ViewOneMeaning {...props} /> }/>
                  <Route path='/meanings/edit/:id' exact component={(props) => <EditMeaning {...props}/> }/>
                  {/* Dreamer */}
                  <Route path='/dreamer/meanings' exact component={() => <DreamerViewAllMeanings/> }/>
                  <Route path='/meanings/letter/:letter' exact component={(props) => <MeaningsByLetter {...props}/> }/>
                  <Route path='/meanings/word/:word' exact component={(props) => <FindingWordMeaning {...props} /> }/>

                  {/*////////// Posted /////////*/}
                  {/* Admin */}
                  <Route path='/dreams/posted' exact component={() => <PostedDreams/>}/>
                  <Route path='/dreams/posted/view/one/:id' exact component={(props) => <ViewOnePostedDream {...props}/> } />
                  {/* Customer */}
                  <Route path='/dreams/posted/mine' exact component={(props) => <MyPosted {...props} tokenUser={this.state.tokenUser} /> }/>
                  <Route path='/dreamer/posted/view/one/:id' exact component={(props) => <DreamerOnePosted {...props} /> } />
                  <Route path='/dreamer/dreams/posted' exact component={() => <DreamerViewAllPostedDreams/> }/>

                  {/*//////// Spotlight ////////*/}
                  {/* Admin */}
                  <Route path='/dreams/spotlighted' exact component={() => <SpotlightedDreams/> } />
                  <Route path='/dreams/spotlight/view/one/:id' exact component={(props) => <ViewOneSpotlightedDream {...props} /> } />
                  {/* Dreamer */}
                  <Route path='/dreamer/spotlighted' exact component={() => <DreamerViewAllSpotlightedDreams/> }/>

                  {/*////////// Knowledge/Links //////////*/}
                  {/* Admin */}
                  <Route path='/knowledge/links' exact component={() => <ViewAllLinks/> }/>
                  <Route path='/knowledge/links/create' exact component={() => <CreateLink/> }/>
                  <Route path='/knowledge/links/details/:id' exact component={(props) => <LinkDetails {...props} /> }/>
                  {/* Customer */}
                  <Route path='/dreamer/knowledge' exact component={() => <DreamerKnowledge/> }/>
                </Router>
            </div>
      );
  }
}

export default AppContainer;