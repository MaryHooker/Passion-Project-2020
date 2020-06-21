import React,{Component} from 'react';

class EditOwnDream extends Component {
    constructor(props) {
        super(props);
        this.state = { 

            type:"",
            dreamDescription:"",
         }
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
                type:json.type,
                dreamDescription:json.dreamDescription,
            }
        )

        //sanity
        console.log(json)
    }

    //handle changes of input fields
    handleChanges = (event) => {
        this.setState(
            {
                [event.target.id]: event.target.value
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
                <h2>Edit</h2>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="type"><span>Type:</span></label>
                        <br/>
                        <input type="text" name='type' id='type' onChange={this.handleChanges} value={this.state.type} />
                    </div>

                    <div className="form-group">
                        <br/>
                        <label htmlFor="dreamDescription"><span>Dream Description:</span></label>
                        <br/>
                        <textarea name='dreamDescription' id='dreamDescription' onChange={this.handleChanges} value={this.state.dreamDescription}  cols="30" rows="10"></textarea>
                    </div>

                    <div className="form-group">
                        <button type='submit' onClick={this.handleSubmission}>Submit</button>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default EditOwnDream;