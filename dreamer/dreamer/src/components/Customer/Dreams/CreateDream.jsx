import React, { Component } from 'react';

class CreateDream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            dreamDescription: "",
            dreamer: this.props.tokenUser.email,  
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
        const newDream = {
            type: this.state.type,
            dreamDescription: this.state.dreamDescription,
            dreamer: this.state.dreamer,
        };
        const response = await fetch(`/api/dream/relate/${this.state.dreamer}`, {
            method: "PUT",
            headers: {
                // "Authorization": this.props.token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newDream)
        });

        const json = await response.json();
        //sanity
        console.log(json)

        this.goBack();
    }

    render() {
        
        return (
            <div>
                <h2>Dream Form</h2>

                <form action="">
                    <div className="form-group">
                        <label htmlFor="type"><span>Type:</span></label>
                        <input type="text" name='type' id='type' onChange={this.handleChanges} value={this.state.type} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dreamDescription"><span>Description:</span></label>
                        <input type="text" name='dreamDescription' id='dreamDescription' onChange={this.handleChanges} value={this.state.dreamDescription} />
                    </div>

                    <div className="form-group">
                        <button type='submit' onClick={this.handleSubmission}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateDream;