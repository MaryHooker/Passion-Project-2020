import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

class DreamerViewOtherPostedDream extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posted:{

            }
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
                posted:json
            }
        )
        //sanity
        console.log(json)
        // console.log(this.state.dream.dreamer[0].name)
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
                </div>
                <button onClick={this.likeDream}>Like</button>
            </div>
         );
    }
}
 
export default DreamerViewOtherPostedDream;