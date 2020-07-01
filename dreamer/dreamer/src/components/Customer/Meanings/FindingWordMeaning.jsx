import React, { Component } from 'react';

class FindingWordMeaning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meaningData: [],
    }
  }

  //when component mounts/run inner function
  componentDidMount() {
    this.meaningByWord();
  }

  //function to fetch method to render all meanings that start with the letter that is passed in
  meaningByWord = async() => {
    let response = await fetch(`/api/meanings/search/${this.props.match.params.word}`, {
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
     console.log(`Word Meaning ${this.state.meaningData[0]}`)
  }

  render() {
    if (this.state.meaningData[0]===undefined) {
      return <div>
          <h4>'{this.props.match.params.word}' not found...</h4>
        </div>
    } 
    return (
      <div>
            <h4> {this.props.match.params.word}'s Symbolic Meaning</h4>
            <div className='oneMeaningDisplay'>
                { /* <p className='listedData'>{this.state.meaning.word}</p> */ }
              {
                this.state.meaningData.map((meaning)=> {
                  return(
                    <div>
                      <p>{meaning.meaning}</p>
                    </div>
                  )
                })
                }
            </div>

        </div>

      );
  }}


export default FindingWordMeaning;