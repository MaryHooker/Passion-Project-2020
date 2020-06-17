import React,{Component} from 'react';
import {Link} from 'react-router-dom';
 
class ViewOneAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            admin:{

            },
         }
    }

    //when component mounts, run inner function
    componentDidMount(){
            this.adminData();
    }
    
    //Function to fetch all dreamers/users from database
    adminData = async() => {
        let response = await fetch(`/dreamers/admin/view/${this.props.match.params.email}`,{
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
        console.log(`Admin : View one ${JSON.stringify(json)}`)
    }

    // deleteAdmin = () => {

    // }

    render() { 
        return ( 
            <div>
                <h3 className='dreamersPageTitle'>View All Admin</h3>
                <br/>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.admin.name}</p>
                <p className='listedData'>{this.state.admin.email}</p>
                </div>
                <Link to={`/admin/edit/${this.state.admin.email}`}><button>Edit</button></Link>
                <button onClick={this.deleteAdmin}>Delete</button>
            </div>
         );
    }
}
 
export default ViewOneAdmin;