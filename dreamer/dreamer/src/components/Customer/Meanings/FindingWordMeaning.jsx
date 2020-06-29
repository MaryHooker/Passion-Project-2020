import React, { Component } from 'react';

class FindingWordMeaning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meaning: {},
    }
  }

  //when component mounts/run inner function
  componentDidMount() {
    this.meaningByWord();
  }

  //function to fetch method to render all meanings that start with the letter that is passed in
  meaningByWord = async() => {
    let response = await fetch(`/api/meanings/word/${this.props.match.params.word}`, {
      method: "GET",
      headers: {

      }
    })
    let json = await response.json();
    //sanity
    console.log(json)
    //place in state
    this.setState({
      meaning: json
    })
  }

  render() {
    return (
      <div>
            {/* <h4> {this.props.match.params.word}'s Symbolic Meaning</h4> */}
            <div className='oneMeaningDisplay'>
                { /* <p className='listedData'>{this.state.meaning.word}</p> */ }
                <p className='listedData'>{this.state.meaning.meaning}</p>
            </div>

        </div>

      );
  }
}

export default FindingWordMeaning;