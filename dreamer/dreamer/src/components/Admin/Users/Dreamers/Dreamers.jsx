import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Dreamers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreamers:[],
         }
    }

    //when component mounts, run inner function
    componentDidMount(){
        this.loadDreamers();
    }

    //Function to fetch all dreamers/users from database
    loadDreamers = async() => {
        let response = await fetch('/dreamers/customers',{
            method:"GET"
        })
        let json = await response.json();
        //sanity
        console.table(json)
        //place data in state
        this.setState({
            dreamers : json
        })
        //sanity
        console.log(`Admin:Dreamers ${JSON.stringify(json)}`)
    }

    render() { 
        return ( 
            <div>
                {/* <h3 className='dreamersPageTitle'>Dreamers</h3> */}
                <br/>
                <div className='dreamersContainer'>
                {
                    this.state.dreamers.map((dreamer) => {
                        return(
                            <div key={dreamer._id} className='dreamersDisplay'>
                                <Link to={`/dreamers/view/one/${dreamer.email}`} className='linkLink'>
                                <p className='listedData'>{dreamer.name}</p>
                                <p className='listedData'>{dreamer.email}</p>
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
 
export default Dreamers;