import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class ViewOneDreamer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreamer:{

            },
         }
    }

    //When component mounts, run inner function
    componentDidMount(){
        this.dreamerData();
    }

    //Function to run fetch method in order to view specific dreamer to update or delete
    dreamerData = async() => {
        let response = await fetch(`/dreamers/customer/view/${this.props.match.params.email}`,{
            method:"GET"
        })
        let json = await response.json();
        console.log(json)
        //place specific dreamer in state
        this.setState(
            {
                dreamer:json
            }
        )
        console.log(this.state.dreamer._id)
    }

    //Function to delete a dreamer from the database
    deleteDreamer = async() => {
        let response = await fetch(`/dreamers/customer/${this.state.dreamer.email}`,{
            method:"DELETE",
        })
        let json = await response.json();
        //sanity
        console.log(`Deleting Dreamer ${JSON.stringify(json)}`);
    }

    render() { 
        return ( 
            <div>
                <h4>Dreamer</h4>
                <Link to={`/dreamers/dreams/view/${this.state.dreamer._id}`}><button>View {this.state.dreamer.name}'s' Dreams</button></Link>
                <br/>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.dreamer.name}</p>
                <p className='listedData'>{this.state.dreamer.email}</p>
                </div>
                <Link to={`/dreamers/edit/${this.state.dreamer.email}`}><button>Edit</button></Link>
                <button onClick={this.deleteDreamer}>Delete</button>
            </div>
         );
    }
}
 
export default ViewOneDreamer;