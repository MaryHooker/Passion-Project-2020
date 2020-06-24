import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MyPosted extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreams:[],
         }
    }

    componentDidMount(){
        this.loadPosted();
    }

    //Fetch method to view a specific dreamer & pull out all of their dreams to be saved in state
    loadPosted = async() => {
        let response = await fetch(`/dreamers/customer/view/${this.props.tokenUser.email}`,{
            method:"GET",
        })
        let json = await response.json();
        //sanity
        console.log(json)
        //place users dreams inside state
        this.setState(
            {
                dreams:json.dreams
            }
        )
        //sanity
        console.log(this.state.dreams)

    }
    render() { 
        if(!this.state.dreams){
            return(
                <div>
                    <h5>You have no posted dreams</h5>
                </div>
            )
        } else{
        return ( 
            <div>
                <h3>My posted dreams</h3>
                {/* map function to drill */}
                <div className='dreamersContainer'>
                {
                    this.state.dreams.map((dream) => {
                        if(dream.posted){
                            return(
                                <div className='dreamersDisplay'>
                                <Link to={`/dreamer/posted/view/one/${dream._id}`} className='linkLink'>
                                    <p className='listedData'>{dream.type}</p>
                                    <p className='listedData'>{dream.dreamDescription}</p>
                                    </Link>
                                </div>
                            )
                        }
                    })
                }
                </div>
            </div>
         );
    }}
}
 
export default MyPosted;