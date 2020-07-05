import React,{Component} from 'react';
import {Button} from 'react-bootstrap';

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

    //On deletion/ go back to page to view all admin again in order to see that the admin was deleted
    goBack = () => {
        window.history.back();
    }

    deleteAdmin = async() => {
        let response = await fetch(`/dreamers/admin/${this.state.admin.email}`,{
            method:"DELETE",
        })
        let json = await response.json();
        //sanity
        console.log(`Deleting Admin ${JSON.stringify(json)}`);

        this.goBack();
    }

    render() { 
        return ( 
            <div>
                {/* <h3 className='dreamersPageTitle'></h3> */}
                <br/>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.admin.name}</p>
                <p className='listedData'>{this.state.admin.email}</p>
                </div>
                {/* <Link to={`/admin/edit/${this.state.admin.email}`}><button>Edit</button></Link> */}
                <Button onClick={this.deleteAdmin}>Delete</Button>
            </div>
         );
    }
}
 
export default ViewOneAdmin;