import React, { Component } from 'react';

class CreateMeaning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letter: "",
            word: "",
            meaning: "",  
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
        const newMeaning = {
            letter: this.state.letter,
            word: this.state.word,
            meaning: this.state.meaning,
        };
        const response = await fetch(`/api/meanings`, {
            method: "POST",
            headers: {
                // "Authorization": this.props.token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newMeaning)
        });

        const json = await response.json();
        //sanity
        console.log(json);

        this.goBack();
    }

    render() {
        
        return (
            <div>
                <h2>Meaning Form</h2>

                <form action="">
                    <div className="form-group">
                        <label htmlFor="letter"><span>Letter:</span></label>
                        <input type="text" name='letter' id='letter' onChange={this.handleChanges} value={this.state.letter} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="word"><span>Word:</span></label>
                        <input type="text" name='word' id='word' onChange={this.handleChanges} value={this.state.word} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="meaning"><span>Meaning:</span></label>
                        <input type="text" name='meaning' id='meaning' onChange={this.handleChanges} value={this.state.meaning} />
                    </div>


                    <div className="form-group">
                        <button type='submit' onClick={this.handleSubmission}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateMeaning;