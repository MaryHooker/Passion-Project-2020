import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class MyDreams extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    //Run inner function when component mounts
    componentDidMount(){
        this.loadDreams();
    }

    // Fetch method to load specific users dreams
    loadDreams = async() => {

    }

    render() { 
        return ( 
            <div>
                <h3 className='dreamersPageTitle'>My Dreams</h3>
                <br/>
                {/* <div className='dreamersContainer'>
                {
                    this.state.dreams.map((dream) => {
                        return(
                            <div className='dreamersDisplay'>
                                <Link to='/dream/view/one' className='linkLink'>
                                <p className='listedData'>{dreamer.name}</p>
                                <p className='listedData'>{dreamer.email}</p>
                                </Link>
                            </div>
                        )
                    })
                }
                </div> */}
            </div>
         );
    }
}
 
export default MyDreams;