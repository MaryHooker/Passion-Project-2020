import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class DreamerViewOtherPostedDream extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posted:{},
            user:[],
         }
    }

    //When component mounts, run inner function
    componentDidMount(){
        this.postedData();
    }

    //Function to run fetch method in order to view specific dream to like
    postedData = async() => {
        let response = await fetch(`/api/dream/view/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        //place specific dream in state
        this.setState(
            {
                posted:json,
                user:json.likes.user
            }
        )
        //sanity
        console.log(json)
        // console.log(this.state.dream.dreamer[0].name)
        console.log(this.state.posted.likes.user.length)
    }

    // function to fetch method in order to update dream likes array
    likeDream = async() => {
        //updated dream to be passed into the database
        let response = await fetch(`/api/dream/like/${this.props.match.params.id}`,{
          method:'PUT',
          headers:{
            "Authorization": this.props.token,
            "Accept":"application/json",
            "Content-Type":"application/json",
          }
        })
        let json = await response.json();
        //sanity
        console.log(`Liking Post ${JSON.stringify(json)}`);
      }

    //  // go back one page
    //  goBack = () => {
    //     window.history.back();
    // }


    render() { 
        if(this.state.redirect){
            return <Redirect to='/dreams/posted'/>
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
                <p className='listedData'>Likes: {this.state.user.length}</p>
                </div>
                <Button onClick={this.likeDream} className='allButton'>Like</Button>
            </div>
         );
    }
}
 
export default DreamerViewOtherPostedDream;