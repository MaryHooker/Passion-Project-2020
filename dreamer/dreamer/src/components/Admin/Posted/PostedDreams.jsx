import React,{Component} from 'react';
// import {Link} from 'react-router-dom';

class PostedDreams extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreams:[],
         }
    }

    //when component mounts, runner inner function
    componentDidMount(){
        this.allDreams();
    }

     //Function to fetch all posted dreams from database
     allDreams = async() => {
        let response = await fetch('/api/dreams/all/posted/true',{
            method:"GET"
        })
        let json = await response.json();
      
        //place data in state
        this.setState({
            dreams : json
        })
        //sanity
        console.log(`Admin : Posted Dreams ${JSON.stringify(json)}`)

    }

    render() { 
        return ( 
            <div>
                <h3>Posted Dreams</h3>
                <div className='dreamersContainer'>
                {
                    this.state.dreams.map((dream) => {
                        return(
                            <div key={dream._id} className='dreamersDisplay'>
                            {/* <Link to={`/dreams/view/one/${dream._id}`} className='linkLink'> */}
                            <p className='listedData'>{dream.type}</p>
                            <p className='listedData'>{dream.dreamDescription}</p>
                            {/* <p className='listedData'>{dream.dreamer.name}</p> */}
                            {/* </Link> */}
                        </div>
                        )
                    })
                }
                </div>
            </div>
         );
    }
}
 
export default PostedDreams;