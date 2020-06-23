import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class ViewOneDream extends Component {
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
        // console.log(this.state.dream.dreamer.name)
    }

      // go back one page
      goBack = () => {
        window.history.back();
    }
    
    //Function to post a dream if post button is clicked
    postDream = async() => {
          //updated dream
          let newDream = {
            type:this.state.type,
            dreamDescription:this.state.dreamDescription,
            posted: "true"
        }
        //fetch method to to update the dream and set the posted property to true
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
        console.log(`Posting Dream ${JSON.stringify(json)}`);

        //go back
        this.goBack();
    }

    //Function to delete a dream from the database
    deleteDream = async() => {
        let response = await fetch(`/api/dream/${this.state.dream._id}`,{
            method:"DELETE",
        })
        let json = await response.json();
        //sanity
        console.log(`Deleting Dream ${JSON.stringify(json)}`);

        this.goBack();
    }

    render() { 
        return ( 
            <div>
                <h2>Dream</h2>
                <br/>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.dream.type}</p>
                <p className='listedData'>{this.state.dream.dreamDescription}</p>
                </div>
                <button onClick={this.postDream}>Post</button>
                <Link to={`/dreamer/dream/edit/${this.state.dream._id}`}><button>Edit</button></Link>
                <button onClick={this.deleteDream}>Delete</button>
            </div>
         );
    }
}
 
export default ViewOneDream;