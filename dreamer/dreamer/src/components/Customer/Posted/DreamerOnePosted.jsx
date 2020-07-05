import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class DreamerOnePosted extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posted:{

            },
            redirect:false,
         }
    }

    //When component mounts, run inner function
    componentDidMount(){
        this.postedData();
    }

    //Function to run fetch method in order to view specific dream to update or delete
    postedData = async() => {
        let response = await fetch(`/api/dream/view/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        //place specific dream in state
        this.setState(
            {
                posted:json
            }
        )
        //sanity
        console.log(json)
        // console.log(this.state.dream.dreamer[0].name)
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
        let response = await fetch(`/api/dream/${this.state.posted._id}`,{
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

    //  // go back one page
    //  goBack = () => {
    //     window.history.back();
    // }

    //Function to remove a Posted dream
    removeDream = async() => {
        //updated dream
        let newDream = {
            type:this.state.posted.type,
            dreamDescription:this.state.posted.dreamDescription,
            posted: "false"
        }
        //fetch method to to update the dream and set the spotlight property to true
        let response = await fetch(`/api/dream/${this.state.posted._id}`,{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newDream)
        })
        let json = await response.json();
        //sanity
        console.log(`Posted Dream ${JSON.stringify(json)}`);

        this.setState({
            redirect:true
        })
        // this.goBack();
    }

    render() { 
        if(this.state.redirect){
            return <Redirect to='/dreams/posted/mine'/>
        }
        return ( 
            <div>
                <h2>Posted Dream</h2>
                <br/>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.posted.type}</p>
                <p className='listedData'>{this.state.posted.dreamDescription}</p>
                </div>
                <Button onClick={this.removeDream}>Remove</Button>
            </div>
         );
    }
}
 
export default DreamerOnePosted;