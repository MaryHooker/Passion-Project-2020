import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Me extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreamer:{},
         }
    }

    //when component mounts, run inner function
    componentDidMount(){
        this.loadData();
        //sanity
        console.log(this.props.tokenUser.email)
    }

    //function to fetch method to view logged in dreamers information
    loadData = async() => {
        let response = await fetch(`/dreamers/customer/view/${this.props.tokenUser.email}`,{
            method:"GET",
        })
        let json = await response.json();
        //sanity
        console.log(`Me ${JSON.stringify(json)}`);
        //place in state
        this.setState({
            dreamer:json
        })
    }

    render() { 
        return ( 
            <div>
                <h3>Me</h3>
                <br/>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.dreamer.name}</p>
                <p className='listedData'>{this.state.dreamer.email}</p>
                </div>
                <Link to={`/me/edit/${this.state.dreamer.email}`}><button>Edit</button></Link>
                {/* <button onClick={this.deleteMe}>Delete</button> */}
            </div>
         );
    }
}
 
export default Me;