import React,{Component} from 'react';
// import {Link} from 'react-router-dom';

class ViewAllLinks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            knowledge:[],
         }
    }

    //when component mounts, run inner function
    componentDidMount(){
            this.loadMeaning();
    }
    
    //Function to fetch all dream links to share from database
    loadMeaning = async() => {
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

    render() { 
        return ( 
            <div>
                <h2 className='dreamersPageTitle'>Knowledge</h2>
                {/* <Link to='/create/link' className='linkLink'><button>Add</button></Link> */}
                <br/>
                <br/>
                <div className='dreamersContainer'>
                {
                    this.state.knowledge.map((link) => {
                        return(
                            <div key={link._id} className='dreamersDisplay'>
                                <a href={link.link}>
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
 
export default ViewAllLinks;