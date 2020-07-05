import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class LinkDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           knowledge:{},
         }
    }

          //When component mounts, run inner function
          componentDidMount(){
            this.linkData();
        }

             //Function to run fetch method in order to view specific link to update or delete
      linkData = async() => {
        let response = await fetch(`/api/links/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        console.log(json)
        //place specific dreamer in state
        this.setState(
            {
               knowledge:json
            }
        )
        console.log(this.state.knowledge.title)
    }

         //go back one page
         goBack = () => {
            window.history.back();
        }

    //Function to delete a link from the database
    deleteLink = async() => {
        let response = await fetch(`/api/links/${this.props.match.params.id}`,{
            method:"DELETE",
        })
        let json = await response.json();
        //sanity
        console.log(`Deleting Link ${JSON.stringify(json)}`);

        this.goBack();
    }
    


    render() { 
        return ( 
            <div>
                {/* <h2>Dream Link</h2> */}
                <br/>
                <br/>
                <div className='dreamerDisplay'>
                  <p className='listedData'>{this.state.knowledge.title}</p>
                  <p className='listedData'>{this.state.knowledge.link}</p>
                  <p className='listedData'>{this.state.knowledge.author}</p>
                </div>
                <Link to={`/links/edit/${this.state.knowledge._id}`}><Button className='allButton'>Edit</Button></Link>
                <Button onClick={this.deleteLink} className='allButton'>Delete</Button>
            </div>
         );
    }
}
 
export default LinkDetails;