import React,{Component} from 'react';
import {Button} from 'react-bootstrap';

class EditDreamer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            email:"",
         }
    }

    //life cycle to run function when component mounts
    componentDidMount(){
        this.loadDreamer();
    }

      //handle input changes
      handleInputs = (event) => {
        if(event.target.name==='name'){
            this.setState({name:event.target.value})
        } else if(event.target.name==='email'){
            this.setState({email:event.target.value})
        } 
    }

    //Function to view specific dreamer to know what is being edited
    loadDreamer = async () => {
        let response = await fetch(`/dreamers/customer/view/${this.props.match.params.email}`, {
            method: 'GET',
        })
        let json = await response.json();
        //sanity
        console.log(json)
        //place received json in state
        this.setState(
            {
               name: json.name,
               email:json.email,
            }
        )
        //sanity
        console.log(`Editing Dreamer ${JSON.stringify(this.state)}`)
    }

     // go back two pages
     goBackTwo = () => {
        window.history.back();
        window.history.back();
    }

    handleSubmission = async(event) => {
        event.preventDefault();
            //define data to be passed through the body
            let updatedDreamer = {
                name:this.state.name,
                email:this.state.email,
            }
            //use fetch to import update method from server
            let response = await fetch(`/dreamers/customer/${this.props.match.params.email}`,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    "Content-type":"application/json",
                    // "Authorization": this.props.token
                },
                body:JSON.stringify(updatedDreamer)
            })
            let json = await response.json();
    
            //sanity
            console.log(` Edit Dreamer ${JSON.stringify(json)}`)

            this.goBackTwo();
    }

    render() { 
        return ( 
            <div>
                <h4>Edit Dreamer</h4>
                <form>
                <div>
                        <label htmlFor="name"><span>Name:</span> </label>
                        <input type="text" name='name' id='name' value={this.state.name} onChange={this.handleInputs}/>
                    </div>
                    <div>
                        <label htmlFor="email"><span>Email:</span> </label>
                        <input type="email" name='email' id='email' value={this.state.email} onChange={this.handleInputs}/>
                    </div>
                    <Button onClick={this.handleSubmission} className='allButton'>Submit</Button>
                </form>
            </div>
         );
    }
}
 
export default EditDreamer;