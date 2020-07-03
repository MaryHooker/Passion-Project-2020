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
  //sanity
  componentDidMount() {
    console.log(`Dream Creator ${JSON.stringify(this.state.dreamer)}`)
  }

  goBack = () => {
    window.history.back();
  }

  // handle changes to fields
  handleChanges = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });

  }

  // handle submission/ fetch method to add a new dream to the database
  handleSubmission = async (event) => {
    event.preventDefault();
    //new dream to be submitted
    const newDream = {
      type: this.state.type,
      dreamDescription: this.state.dreamDescription,
    // dreamer: this.state.dreamer,
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
                {/* <h2>Dream Form</h2> */}

                <form action="">
                    <div className="form-group">
                    {/* <label for="type">Dream Type</label> */}

                        <select name="type" id="type" onChange={this.handleChanges} value={this.state.type}>
                        <option >Dream Type</option>
                        <option value="Daydream" data-toggle='tooltip' title='Hooray!'>Daydream</option>
                        <option value="Lucid">Lucid</option>
                        <option value="Nightmare">Nightmare</option>
                        <option value="Recurring">Recurring</option>
                        <option value="Healing">Healing</option>
                        <option value="Prophetic">Prophetic</option>
                        <option value="Signal">Signal</option>
                        <option value="Epic">Epic</option>
                        </select>
                    <br/>
                    <br/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dreamDescription"><span className='whatHappened'>What happened?</span></label>
                        <br/>
                        <br/>
                        <textarea name="dreamDescription" id="dreamDescription" cols="50" rows="20"  onChange={this.handleChanges} value={this.state.dreamDescription} ></textarea>
                        {/* <input type="text" name='dreamDescription' id='dreamDescription' onChange={this.handleChanges} value={this.state.dreamDescription} /> */}
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