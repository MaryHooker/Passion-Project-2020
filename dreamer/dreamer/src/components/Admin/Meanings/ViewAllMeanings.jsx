import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class ViewAllMeanings extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            meanings:[],
         }
    }

    //when component mounts, run inner function
    componentDidMount(){
            this.loadMeaning();
    }
    
    //Function to fetch all dreamers/users from database
    loadMeaning = async() => {
        let response = await fetch('/api/meanings',{
            method:"GET"
        })
        let json = await response.json();
        //sanity
        console.table(json)
        //place data in state
        this.setState({
            meanings : json
        })
        //sanity
        console.log(`Admin : Meanings ${JSON.stringify(json)}`)
    }

    render() { 
        return ( 
            <div>
                <h3 className='dreamersPageTitle'>All Meanings</h3>
                <Link to='/create/meaning' className='linkLink'><button>Add Meaning</button></Link>
                <br/>
                <br/>
                <div className='dreamersContainer'>
                {
                    this.state.meanings.map((meaning) => {
                        return(
                            <div key={meaning._id} className='dreamersDisplay'>
                                <p className='listedData'>{meaning.word}</p>
                                <p className='listedData'>{meaning.meaning}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
         );
    }
}
 
export default ViewAllMeanings;