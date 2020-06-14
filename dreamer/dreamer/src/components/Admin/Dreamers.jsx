import React,{Component} from 'react';

class Dreamers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dreamers:[],
         }
    }

    //when component mounts, run inner function
    componentDidMount(){
        this.loadDreamers();
    }

    //Function to fetch all dreamers/users from database
    loadDreamers = async() => {
        let response = await fetch('/dreamer/customers',{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",

            }
        })
        let json = await response.json();
        console.table(json)
    }

    render() { 
        return ( 
            <div>
                <h4>Dreamers</h4>
            </div>
         );
    }
}
 
export default Dreamers;