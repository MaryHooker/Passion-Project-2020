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
                <h3>Welcome back {this.props.tokenUser.name}!</h3>
                </div>
                <div className='adminLinkP'>
                <Link to='/admin/view/all' className='adminLink'>Admin</Link>
                </div>
                <div className='dreamersLinkP'>
                <Link to='/view/dreamers' className='dreamersLink'>Dreamers</Link>
                </div> 
            </div>
         );
    }
}
 
export default AdminHome;