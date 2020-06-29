import React,{Component} from 'react';

class MeaningsByLetter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            meanings:[],
         }
    }

    //when component mounts/run inner function
    componentDidMount(){
        this.meaningsByLetter();
    }

    //function to fetch method to render all meanings that start with the letter that is passed in
    meaningsByLetter = async() => {
        let response = await fetch(`/api/meanings/view/${this.props.match.params.letter}`,{
            method:"GET",
            headers:{

            }
        })
        let json = await response.json();
        //sanity
        console.log(json)
        //place in state
        this.setState({meanings:json})
    }

    render() { 
        return ( 
            <div>
                {/* <h4> "{this.props.match.params.letter}" Meanings</h4> */}
                <div className='dreamersContainer'>
                {
                    this.state.meanings.map((meaning) => {
                        return(
                            <div key={meaning._id} className='dreamersDisplayM'>
                                <p className='listedData'>{meaning.word}</p>
                                <p className='listedData'>{meaning.meaning}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
          
         );
    }
}
 
export default MeaningsByLetter;