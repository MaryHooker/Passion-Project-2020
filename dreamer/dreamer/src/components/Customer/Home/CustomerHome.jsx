import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class CustomerHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreams:[],
         }
    }
    render() { 
        return ( 
            <div>
                <h2>Welcome back <span className='userName'>{this.props.tokenUser.name}</span>!</h2>
                <br/>
                <div className='dreamersLink'>
                <Link to='/myDreams' className='dreamersLink'><button className='adminHomeButton4'>My Dreams</button></Link>
                </div>
            </div>
         );
    }
}
 
export default CustomerHome;