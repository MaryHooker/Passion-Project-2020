import React,{Component} from 'react';
// import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

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
        // console.log(this.state.dream.dreamer.name)
    }

      // go back one page
      goBack = () => {
        window.history.back();
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
                {/* <p className='listedData'>{this.state.dream.dreamer[0].name}</p> */}
                </div>
                
                <Button onClick={this.deleteDream} className='allButton'>Delete</Button>
            </div>
         );
    }
}
 
export default AdminViewOneDream;