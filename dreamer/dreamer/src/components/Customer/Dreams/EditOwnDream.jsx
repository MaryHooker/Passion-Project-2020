import React,{Component} from 'react';

class EditOwnDream extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    //when component mounts, run the inner function
    componentDidMount(){
        this.dreamData();
    }

    //function to fetch method to to view the details of thhe dream the user wishes to edit
    dreamData = async() => {
        let response = await fetch(`/api/dream/view/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        //place specific dream in state
        this.setState(
            {
                dream:json
            }
        )
    }

    //handle the submission button by fetching the method to update the dream
    handleSubmission = async(event) => {
        event.preventDefault();
        let updatedDream = {
            type:this.state.type,
            dreamDescription:this.state.dreamDescription,
        }
        let response = await fetch(`/api/dream/${this.props.match.params.id}`,{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-type":"application'json"
            },
            body: JSON.stringify(updatedDream)
        })
        let json = await response.json();
        //sanity
        console.log(json)
    }

    render() { 
        return ( 
            <div>
                <h2>Edit Own Dream</h2>
            </div>
         );
    }
}
 
export default EditOwnDream;