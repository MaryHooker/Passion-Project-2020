import React,{Component} from 'react';

class SpotlightedDreams extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            spotlighted:[],
         }
    }

    //when component mounts, run inner function to show all spotlighted dreams
    componentDidMount(){
        this.loadSpotlight();
    }

    //function to fetch method to render all spotlighted dreams
    loadSpotlight = async() => {
        let response = await fetch(``)
    }

    render() { 
        return ( 
            <div>
                <h3>Spotlighted Dreams</h3>
            </div>
         );
    }
}
 
export default SpotlightedDreams;