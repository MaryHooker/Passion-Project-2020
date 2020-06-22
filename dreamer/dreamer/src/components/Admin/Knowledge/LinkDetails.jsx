import React,{Component} from 'react';
// import {Link} from 'react-router-dom';

class LinkDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title:"",
            link:"",
            author:"",
            date:""
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
                title:json.title,
                link:json.link,
                author:json.author,
                date:json.date
            }
        )
        console.log(this.state.title)
    }

         // go back one page
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
                <h2>Dream Link</h2>
                <br/>
                <br/>
                <div className='linkDisplay'>
                <p className='listedData'>{this.state.title}</p>
                <p className='listedData'>{this.state.link}</p>
                <p className='listedData'>{this.state.author}</p>
                </div>
                {/* <Link to={`/meanings/edit/${this.state.link._id}`}><button>Edit</button></Link> */}
                <button onClick={this.deleteLink}>Delete</button>
            </div>
         );
    }
}
 
export default LinkDetails;