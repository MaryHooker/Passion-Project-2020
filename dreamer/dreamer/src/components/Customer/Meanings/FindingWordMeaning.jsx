import React, { Component } from 'react';

class FindingWordMeaning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meaningData: {},
    }
  }

  //when component mounts/run inner function
  componentDidMount() {
    this.meaningByWord();
  }

  //function to fetch method to render all meanings that start with the letter that is passed in
  meaningByWord = async() => {
    let response = await fetch(`/api/meanings/one/${this.props.match.params.word}`, {
      method: "GET"
    })
    //sanity
    console.log(response)
    let json = await response.json();
  //  if(json.error){
  //    this.setState({meaning:{}})
  //  }
    //place in state
    this.setState({
     meaningData:json
    })

     //sanity
     console.log(`Word Meaning ${this.state.meaningData.word}`)
  }

  render() {
    if (this.state.meaningData.word===undefined) {
      return <div>
          <h4>'{this.props.match.params.word}' not found...</h4>
        </div>
    } 
    return (
      <div>
            <h4> {this.props.match.params.word}'s Symbolic Meaning</h4>
            <div className='oneMeaningDisplay'>
                { /* <p className='listedData'>{this.state.meaning.word}</p> */ }
              <p>{this.state.meaningData.word}</p>
            </div>

        </div>

      );
  }}


export default FindingWordMeaning;