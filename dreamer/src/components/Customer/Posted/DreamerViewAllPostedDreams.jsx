import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class DreamerViewAllPostedDreams extends Component {
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
        console.log(json)

    }

    render() { 
        return ( 
            <div>
                <h2>Posted Dreams</h2>
                <div className='dreamersContainer'>
                {
                    this.state.dreams.map((dream) => {
                        return(
                            <div key={dream._id} className='dreamersDisplay'>
                            <p className='listedData'>{dream.type}</p>
                            <p className='listedData'>{dream.dreamDescription}</p>
                            {
                                dream.dreamer.map((dreamer) => {
                                    return(
                                        <div key={dreamer._id}>
                                            <p className='listedData'>{dreamer.name}</p>
                                        </div>
                                    )
                                })
                            }
                          
                        </div>
                        )
                    })

                }
                </div>
            </div>
         );
    }
}
 
export default DreamerViewAllPostedDreams;