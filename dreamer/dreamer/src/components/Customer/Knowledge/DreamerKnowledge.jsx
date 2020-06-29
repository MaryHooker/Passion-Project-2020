import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class DreamerKnowledge extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            knowledge:[],
         }
    }

    //when component mounts, run inner function
    componentDidMount(){
            this.loadKnowledge();
    }
    
    //Function to fetch all dream links to share from database
    loadKnowledge = async() => {
        let response = await fetch('/api/links',{
            method:"GET"
        })
        let json = await response.json();
        //sanity
        console.table(json)
        //place data in state
        this.setState({
            knowledge : json
        })
        //sanity
        console.table(`Admin : Knowledge Links ${JSON.stringify(json)}`)
    }

    //    // go back one page
    //    goBack = () => {
    //     window.history.back();
    // }

       //Function to delete a link from the database
       deleteLink = async() => {
        let response = await fetch(`/api/links/${this.state.knowledge.id}`,{
            method:"DELETE",
        })
        let json = await response.json();
        //sanity
        console.log(`Deleting Link ${JSON.stringify(json)}`);

        // this.goBack();
    }

    render() { 
        return ( 
            <div>
                {/* <h2 className='dreamersPageTitle'>Knowledge</h2> */}
                <br/>
                <br/>
                <div className='linksContainer'>
                {
                    this.state.knowledge.map((link) => {
                        return(
                            <div key={link._id} className='knowledgeDisplay'>
                                <a href={link.link} className='noLineLinks'target="_blank">
                                <p className='listedData'>{link.title}</p>
                                <p className='listedData'>{link.link}</p>
                                <p className='listedData'>{link.author}</p>
                                </a>
                            </div>
                        )
                    })
                }
                </div>    
            </div>
         );
    }
}
 
export default DreamerKnowledge;