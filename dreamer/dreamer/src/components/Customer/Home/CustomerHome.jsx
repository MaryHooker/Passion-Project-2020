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
                <h2>Welcome back {this.props.tokenUser.name}!</h2>
                <br/>
                <div className='dreamersLink'>
                <Link to='/myDreams' className='dreamersLink'>My Dreams</Link>
                </div>
               
            </div>
         );
    }
}
 
export default CustomerHome;