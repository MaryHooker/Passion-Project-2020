import React,{Component} from 'react';

class DreamersDreams extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreams:[],
         }
    }

    //Run inner function when component mounts
    componentDidMount(){
        this.loadDreams();
    }

    // Fetch method to load specific users dreams
    loadDreams = async() => {
        let response = await fetch(`/api/dreams/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        //sanity
        console.table(json);
        //place in state
        this.setState({
            dreams:json
        })
        //sanity
        console.log(`My Dreams state ${JSON.stringify(json)}`)
    }

    render() { 
        return ( 
            <div>
                <h2 className='dreamersPageTitle'>Dreams</h2>
                <br/>
                <div className='dreamersContainer'>
                {
                    this.state.dreams.map((dream) => {
                        return(
                            <div className='dreamDisplay'>
                                <p className='listedData'>{dream.type}</p>
                                <p className='listedData'>{dream.dreamDescription}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
         );
    }
}
 
export default DreamersDreams;