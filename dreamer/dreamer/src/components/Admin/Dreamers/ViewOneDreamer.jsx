import React,{Component} from 'react';

class ViewOneDreamer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    // //When component mounts, run inner function
    // componentDidMount(){
    //     this.dreamData();
    // }

    // //Function to run fetch method in order to view specific dream to update or delete
    // dreamData = async() => {
    //     let response = await fetch(`/api/dream/view/`)
    // }

    render() { 
        return ( 
            <div>
                <h4>View one dreamer</h4>
            </div>
         );
    }
}
 
export default ViewOneDreamer;