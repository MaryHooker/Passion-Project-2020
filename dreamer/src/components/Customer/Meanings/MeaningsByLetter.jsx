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
                <div className='dreamersContainerM'>
                {
                    this.state.meanings.map((meaning) => {
                        return(
                            <div key={meaning._id} className='meaningsDisplayM'>
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