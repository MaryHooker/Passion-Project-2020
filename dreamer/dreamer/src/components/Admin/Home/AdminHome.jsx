import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='adminHomeContainer'>
                <div className='adminTitle'>
                <h2>Welcome back <span className='userName'>{this.props.tokenUser.name}</span>!</h2>
                </div>
                <div className='adminLinkP'>
                <Link to='/admin/view/all' className='adminLink'><button className='adminHomeButton'>Admin</button></Link>
                </div>
                <div className='dreamersLinkP'>
                <Link to='/view/dreamers' className='dreamersLink'><button className='adminHomeButton'>Dreamers</button></Link>
                </div>
                <div className='meaningsLinkP'>
                <Link to='/view/meanings' className='meaningsLink'><button className='adminHomeButton'>Meanings</button></Link>
                </div>
                <div className='dreamsLinkP'>
                <Link to='/dreams/view/all' className='dreamsLink'><button className='adminHomeButton'>Dreams</button></Link>
                </div> 

            </div>
         );
    }
}
 
export default AdminHome;