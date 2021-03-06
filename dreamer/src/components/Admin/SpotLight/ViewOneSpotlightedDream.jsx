import React,{Component} from 'react';
// import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class AdminViewOneDream extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            spotlight:{

            },
         }
    }

    //When component mounts, run inner function
    componentDidMount(){
        this.spotlightData();
    }

    //Function to run fetch method in order to view specific dream to update or delete
    spotlightData = async() => {
        let response = await fetch(`/api/dream/view/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        //place specific dream in state
        this.setState(
            {
                spotlight:json
            }
        )
        //sanity
        console.log(json)
        // console.log(this.state.dream.dreamer[0].name)
    }

     // go back one page
     goBack = () => {
        window.history.back();
    }

    //Function to remove a Spotlight dream
    removeDream = async() => {
        //updated dream
        let newDream = {
            type:this.state.spotlight.type,
            dreamDescription:this.state.spotlight.dreamDescription,
            spotlight: "false"
        }
        //fetch method to to update the dream and set the spotlight property to true
        let response = await fetch(`/api/dream/${this.state.spotlight._id}`,{
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

        this.goBack();
    }

    render() { 
        return ( 
            <div>
                <h2>Spotlighted Dream</h2>
                <br/>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.spotlight.type}</p>
                <p className='listedData'>{this.state.spotlight.dreamDescription}</p>
                </div>
                <Button onClick={this.removeDream} className='allButton'>Remove</Button>
            </div>
         );
    }
}
 
export default AdminViewOneDream;