import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class ViewAllAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            admin:[],
         }
    }

    //when component mounts, run inner function
    componentDidMount(){
            this.loadAdmin();
    }
    
    //Function to fetch all dreamers/users from database
    loadAdmin = async() => {
        let response = await fetch('/dreamers/admin',{
            method:"GET"
        })
        let json = await response.json();
        //sanity
        console.table(json)
        //place data in state
        this.setState({
            admin : json
        })
        //sanity
        console.log(`Admin : Admin ${JSON.stringify(json)}`)
    }

    render() { 
        return ( 
            <div>
                <h3 className='dreamersPageTitle'>View All Admin</h3>
                <br/>
                <div className='dreamersContainer'>
                {
                    this.state.admin.map((admin) => {
                        return(
                            <div key={admin._id} className='dreamersDisplay'>
                                <Link to={`/admin/view/one/${admin.email}`} className='linkLink'>
                                <p className='listedData'>{admin.name}</p>
                                <p className='listedData'>{admin.email}</p>
                                </Link>
                            </div>
                        )
                    })
                }
                </div>
            </div>
         );
    }
}
 
export default ViewAllAdmin;