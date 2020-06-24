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
            <div className='adminHomeContainer'>
                <div className='adminTitle'>
                <h2>Welcome back <span className='userName'>{this.props.tokenUser.name}</span>!</h2>
                </div>
                <br/>
                <div className='adminLinkP'>
                <Link to='/me' className='dreamersLink'><button className='adminHomeButton1'>Me</button></Link>
                </div>
                <div className='dreamsLinkP'>
                <Link to='/myDreams' className='dreamersLink'><button className='adminHomeButton4'>My Dreams</button></Link>
                </div>
                <div className='dreamersLinkP'>
                <Link to='/dreamer/dreams/posted' className='dreamersLink'><button className='adminHomeButton3'>Posted Dreams</button></Link>
                </div>
                <div className='knowledgeLinkP'>
                <Link to='/dreamer/knowledge' className='dreamersLink'><button className='adminHomeButton5'>Knowledge</button></Link>
                </div>
            </div>
         );
    }
}
 
export default CustomerHome;