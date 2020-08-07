import React,{Component} from 'react';
import {Button} from 'react-bootstrap';

class EditKnowledgeLink extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
                title:"",
                link:"",
                author:"",
            
         }
    }

       //When component mounts, run inner function
       componentDidMount(){
        this.linkData();
    }

      //handle changes of input fields
      handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
      //Function to run fetch method in order to view specific link to update or delete
      linkData = async() => {
        let response = await fetch(`/api/links/${this.props.match.params.id}`,{
            method:"GET"
        })
        let json = await response.json();
        console.log(json)
        //place specific dreamer in state
        this.setState(
            {
               title:json.title,
               link:json.link,
               author:json.author
            }
        )
        console.log(json)
    }

          // go back two pages
     goBack = () => {
        window.history.back();
        // window.history.back();
    }


        //Function to update a knowledge link from the database on form submission
        handleSubmission = async() => {
            let updatedLink = {
                title: this.state.title,
                link: this.state.link,
                author: this.state.author
            }
            let response = await fetch(`/api/links/${this.props.match.params.id}`,{
                method:"PUT",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(updatedLink)
            })
            let json = await response.json();
            //sanity
            console.log(`Updated Knowledge Link ${JSON.stringify(json)}`);

            //go back after being edited
            this.goBack();
        }


    render() { 
        return ( 
            <div>
                  <form>
                        <input type="text" id='title' name='title' value={this.state.title} onChange={this.handleChange}/>
                        <br/>
                        <input type="text" id='link' name='link' value={this.state.link} onChange={this.handleChange}/>
                        <br/>
                        <input type="text" id='author' name='author' value={this.state.author} onChange={this.handleChange}/>
                        <br/>
                        <Button onClick={this.handleSubmission} className='allButton'>Submit</Button>
                    </form>
            </div>
         );
    }
}
 
export default EditKnowledgeLink;