import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class ViewOneMeaning extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            meaning:{

            },
         }
    }

    //When component mounts, run inner function
    componentDidMount(){
        this.meaningData();
    }

    //Function to run fetch method in order to view specific dreamer to update or delete
    meaningData = async() => {
        let response = await fetch(`/api/meanings/one/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        console.log(json)
        //place specific dreamer in state
        this.setState(
            {
                meaning:json
            }
        )
        console.log(this.state.meaning._id)
    }

         // go back one page
         goBack = () => {
            window.history.back();
        }

    //Function to delete a dreamer from the database
    deleteMeaning = async() => {
        let response = await fetch(`/api/meanings/${this.state.meaning.id}`,{
            method:"DELETE",
        })
        let json = await response.json();
        //sanity
        console.log(`Deleting Meaning ${JSON.stringify(json)}`);

        this.goBack();
    }

    render() { 
        return ( 
            <div>
                <h2>Meaning</h2>
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                <p className='listedData'>{this.state.meaning.letter}</p>
                <p className='listedData'>{this.state.meaning.word}</p>
                <p className='listedData'>{this.state.meaning.meaning}</p>
                </div>
                <Link to={`/meanings/edit/${this.state.meaning._id}`}><button>Edit</button></Link>
                <button onClick={this.deleteMeaning}>Delete</button>
            </div>
         );
    }
}
 
export default ViewOneMeaning;