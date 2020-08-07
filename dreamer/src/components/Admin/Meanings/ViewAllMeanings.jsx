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
        console.table(`Admin : Meanings ${JSON.stringify(json)}`)
    }

    render() { 
        return ( 
            <div>
                {/* <h2 className='dreamersPageTitle'>Meanings</h2> */}
                <Link to='/create/meaning' className='linkLink'><img src="../addSymbol2.png" alt="addSymbol"/></Link>
                <br/>
                <br/>
                <div className='dreamersContainerM'>
                {
                    this.state.meanings.map((meaning) => {
                        return(
                            <div key={meaning._id} className='meaningsDisplayAdmin'>
                                <Link to={`/meanings/view/one/${meaning._id}`} className='linkLink'>
                                <p className='listedData'>{meaning.word}</p>
                                <p className='listedData'>{meaning.meaning}</p>
                                </Link>
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