import React,{Component} from 'react';
// import {Link} from 'react-router-dom';

class AdminViewOneDream extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dream:{

            },
         }
    }

    //When component mounts, run inner function
    componentDidMount(){
        this.dreamData();
    }

    //Function to run fetch method in order to view specific dream to update or delete
    dreamData = async() => {
        let response = await fetch(`/api/dream/view/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        //place specific dream in state
        this.setState(
            {
                dream:json
            }
        )
        console.log(this.state.dream.dreamer[0].name)
    }

    //Function to Spotlight a dream
    spotlightDream = async() => {
        //updated dream
        let newDream = {
            type:this.state.type,
            dreamDescription:this.state.dreamDescription,
            spotlight: "true"
        }
        //fetch method to to update the dream and set the spotlight property to true
        let response = await fetch(`/api/dream/${this.state.dream._id}`,{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newDream)
        })
        let json = await response.json();
        //sanity
        console.log(`Spotlighted Dream ${JSON.stringify(json)}`);
    }

    //Function to delete a dream from the database
    deleteDream = async() => {
        let response = await fetch(`/api/dream/${this.state.dream._id}`,{
            method:"DELETE",
        })
        let json = await response.json();
        //sanity
        console.log(`Deleting Dream ${JSON.stringify(json)}`);
    }

    render() { 
        return ( 
            <div>
                <h4>Dream</h4>
                <br/>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.dream.type}</p>
                <p className='listedData'>{this.state.dream.dreamDescription}</p>
                {/* <p className='listedData'>{this.state.dream.dreamer[0].name}</p> */}
                </div>
                <button onClick={this.spotlightDream}>Spotlight</button>
                <button onClick={this.deleteDream}>Delete</button>
            </div>
         );
    }
}
 
export default AdminViewOneDream;