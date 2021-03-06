import React,{ Component } from 'react';
import {Button} from 'react-bootstrap';

class CreateLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            link: "",
            author: "",  
        }
    }

    goBack = () => {
        window.history.back();
    }

    // handle changes to fields
    handleChanges = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
   
    // handle submission/ fetch method to add a new meaning to the database
    handleSubmission = async (event) => {
        event.preventDefault();
        //new meaning to be submitted
        const newLink = {
            title: this.state.title,
            link: this.state.link,
            author: this.state.author,
        };
        const response = await fetch(`/api/links`, {
            method: "POST",
            headers: {
                // "Authorization": this.props.token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newLink)
        });

        const json = await response.json();
        //sanity
        console.log(json);

        this.goBack();
    }

    render() {
        
        return (
            <div>
                {/* <h2>Knowledge/Link Form</h2> */}

                <form action="">
                    <div className="form-group">
                        {/* <label htmlFor="title"><span>Title:</span></label> */}
                        <input type="text" name='title' id='title' onChange={this.handleChanges} value={this.state.title} maxlength="50" placeholder='Title'/>
                    </div>

                    <div className="form-group">
                        {/* <label htmlFor="link"><span>Link:</span></label> */}
                        <input type="text" name='link' id='link' onChange={this.handleChanges} value={this.state.link} placeholder='Link'/>
                    </div>

                    <div className="form-group">
                        {/* <label htmlFor="author"><span>Author:</span></label> */}
                        <input type="text" name='author' id='author' onChange={this.handleChanges} value={this.state.author} placeholder='Author'/>
                    </div>


                    <div className="form-group">
                        <Button type='submit' onClick={this.handleSubmission} className='allButton'>Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateLink;