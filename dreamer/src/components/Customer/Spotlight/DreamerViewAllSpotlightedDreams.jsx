import React,{Component} from 'react';

class DreamerViewAllSpotlightedDreams extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            spotlighted:[],
         }
    }

    //when component mounts, run inner function to show all spotlighted dreams
    componentDidMount(){
        // this.loadSpotlight();
    }

    // //function to fetch method to render all spotlighted dreams
    // loadSpotlight = async() => {
    //     let response = await fetch(`/api/dreams/all/spotlight/true`,{
    //         method:"GET",
           
    //     })
    //     let json = await response.json();
    //     //sanity
    //     console.log(`All Spotlighted Dreams ${JSON.stringify(json)}`)
    //     //place in state
    //     this.setState(
    //         {
    //             spotlighted:json
    //         }
    //     )
    // }

    render() { 
        return ( 
            <div>
                {/* <h3>Spotlighted Dreams</h3> */}
                <div className='dreamersContainer'>
                {
                    this.state.spotlighted.map((dream) => {
                        return(
                            <div key={dream._id} className='dreamersDisplayK'>
                            {/* <Link to={`/dreams/spotlight/view/one/${dream._id}`} className='linkLink'> */}
                            <p className='listedData'>{dream.type}</p>
                            <p className='listedData'>{dream.dreamDescription}</p>
                            {
                                dream.dreamer.map((dreamer) => {
                                    return(
                                        <div key={dreamer._id}>
                                            <p className='listedData'>{dreamer.name}</p>
                                        </div>
                                    )
                                })
                            }
                            {/* </Link> */}
                        </div>
                        )
                    })
                }
                </div>
            </div>
         );
    }
}
 
export default DreamerViewAllSpotlightedDreams;