import React, { Component } from 'react';
import {DropdownButton,Dropdown} from 'react-bootstrap';

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
                { /* <h2>Dream Form</h2> */ }
                <DropdownButton id="dropdown-item-button" title="Dream Type">
  <Dropdown.Item as="button" value="Daydream" data-toggle='tooltip' title='Day dreaming is classified as a level of consciousness between sleep and wakefulness.'>Daydream</Dropdown.Item>
  <Dropdown.Item as="button" value="Lucid" data-toggle='tooltip' title='Lucid dreams occur when you realize you are dreaming.'>Lucid</Dropdown.Item>
  <Dropdown.Item as="button" value="Nightmare" data-toggle='tooltip' title='A nightmare is a disturbing dream that causes the dreamer to wake up feeling anxious and frightened.'>Nightmare</Dropdown.Item>
  <Dropdown.Item as="button" value="Recurring" data-toggle='tooltip' title='Recurring dreams repeat themselves with little variation in story or theme.'>Recurring</Dropdown.Item>
  <Dropdown.Item as="button" value="Healing" data-toggle='tooltip' title='Healing dreams serve as messages for the dreamer in regards to their health.'>Healing</Dropdown.Item>
  <Dropdown.Item as="button" value="Prophetic" data-toggle='tooltip' title='Prophetic dreams also referred to as precognitive or psychic dreams are dreams that seemingly foretell the future.'>Prophetic</Dropdown.Item>
  <Dropdown.Item as="button" value="Signal" data-toggle='tooltip' title='Signal dreams help you how to solve problems or make decisions in your waking life.'>Signal</Dropdown.Item>
  <Dropdown.Item as="button" value="Epic" data-toggle='tooltip' title='Epic dreams (or Great dreams) are so huge, so compelling, and so vivid that you cannot ignore them.'>Epic</Dropdown.Item>
</DropdownButton>

                <form action="">
                    <div className="form-group">
                      { //////////*Tool Tip Works in firefox *////////// }
                        /* <select name="type" id="type" onChange={this.handleChanges} value={this.state.type}>
                        <option >Dream Type</option>
                        <option value="Daydream" data-toggle='tooltip' title='Day dreaming is classified as a level of consciousness between sleep and wakefulness.'>Daydream</option>
                        <option value="Lucid" data-toggle='tooltip' title='Lucid dreams occur when you realize you are dreaming.'>Lucid</option>
                        <option value="Nightmare" data-toggle='tooltip' title='A nightmare is a disturbing dream that causes the dreamer to wake up feeling anxious and frightened.'>Nightmare</option>
                        <option value="Recurring" data-toggle='tooltip' title='Recurring dreams repeat themselves with little variation in story or theme.'>Recurring</option>
                        <option value="Healing" data-toggle='tooltip' title='Healing dreams serve as messages for the dreamer in regards to their health.'>Healing</option>
                        <option value="Prophetic" data-toggle='tooltip' title='Prophetic dreams also referred to as precognitive or psychic dreams are dreams that seemingly foretell the future.'>Prophetic</option>
                        <option value="Signal" data-toggle='tooltip' title='Signal dreams help you how to solve problems or make decisions in your waking life.'>Signal</option>
                        <option value="Epic" data-toggle='tooltip' title='Epic dreams (or Great dreams) are so huge, so compelling, and so vivid that you cannot ignore them.'>Epic</option>
                        </select> */}
                    <br/>
                    <br/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dreamDescription"><span className='whatHappened'>What happened?</span></label>
                        <br/>
                        <br/>
                        <textarea name="dreamDescription" id="dreamDescription" cols="50" rows="20"  onChange={this.handleChanges} value={this.state.dreamDescription} ></textarea>
                        { /* <input type="text" name='dreamDescription' id='dreamDescription' onChange={this.handleChanges} value={this.state.dreamDescription} /> */ }
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