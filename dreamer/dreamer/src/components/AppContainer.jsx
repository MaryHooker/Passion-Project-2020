import React,{Component} from 'react';
import CustomerRegister from './CustomerRegister';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Login from './Login/Login';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <h1>Dreamer</h1>
                <Router>
                <Link to='/register' className='noLine'>Register</Link><hr/> 
                <Link to='/login' className='noLine'>Login</Link>
                <br/>
                <br/>
                {/* Routes */}
                
                {/* Register/Login */}
                <Route path='/register' exact component={() => <CustomerRegister/> }/>
                <Route path='/login' exact component={() => <Login/> }/>
                </Router>
            </div>
         );
    }
}
 
export default AppContainer;