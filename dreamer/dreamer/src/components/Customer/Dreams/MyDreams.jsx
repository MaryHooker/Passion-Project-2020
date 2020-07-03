import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class MyDreams extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreams:[],
         }
    }

    //Run inner function when component mounts
    componentDidMount(){
        this.loadDreams();
    }

    // Fetch method to load specific users dreams
    loadDreams = async() => {
        let response = await fetch(`/api/dreams/${this.props.tokenUser.id}`,{
            method:"GET"
        })
        let json = await response.json();
        //sanity
        console.table(json);
        //place in state
        this.setState({
            dreams:json
        })
        //sanity
        // console.log(`My Dreams state ${JSON.stringify(json)}`)
    }

    render() { 
        return ( 
            <div>
                {/* <h2 className='dreamersPageTitle'>My Dreams</h2> */}
                {/* <br/> */}
                <Link to='/dreams/posted/mine' className='linkLink'><button className='postLink'>My Posted Dreams</button></Link>
                
                <br/>
                <Link to={`/create/dream/${this.props.tokenUser.email}`} className='linkLink' ><img src="./addSymbol2.png" title="Add Dream" alt="addSymbol"/></Link>
                <br/>
                <br/>
                <div className='dreamersContainer'>
                {
                    this.state.dreams.map((dream) => {
                        return(
                            <div key={dream._id} className='dreamersDisplay'>
                               <Link to={`dreamers/dreams/view/one/${dream._id}`} className='noLineLinks'>
                                <p className='listedData'>{dream.type}</p>
                                <p className='listedData'>{dream.dreamDescription}</p>
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
 
export default MyDreams;