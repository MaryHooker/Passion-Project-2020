import React,{Component} from 'react';

class EditMeaning extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            letter:"",
            word:"",
            meaning:"",
         }
    }

    //life cycle to run function when component mounts
    componentDidMount(){
        this.loadMeaning();
    }

    // handle changes to fields
    handleChanges = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    //Function to view specific meaning to know what is being edited
    loadMeaning = async () => {
        let response = await fetch(`/api/meanings/one/${this.props.match.params.id}`, {
            method: 'GET',
        })
        let json = await response.json();
        //sanity
        console.log(json)
        //place received json in state
        this.setState(
            {
             letter:json.letter,
             word:json.word,
             meaning:json.meaning
            }
        )
        //sanity
        console.log(`Viewing Meaning ${JSON.stringify(this.state)}`)
    }

     // go back two pages
     goBackTwo = () => {
        window.history.back();
        window.history.back();
    }

    handleSubmission = async(event) => {
        event.preventDefault();
            //define data to be passed through the body
            let updatedMeaning = {
                letter:this.state.letter,
                word:this.state.word,
                meaning:this.state.meaning
            }
            //use fetch to import update method from server
            let response = await fetch(`/api/meanings/${this.props.match.params.id}`,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    "Content-type":"application/json",
                    // "Authorization": this.props.token
                },
                body:JSON.stringify(updatedMeaning)
            })
            let json = await response.json();
    
            //sanity
            console.log(` Edit Meaning ${JSON.stringify(json)}`)

            this.goBackTwo();
    }

    render() { 
        return ( 
            <div>
                {/* <h2>Edit Meaning</h2> */}
                <form>
                <div className="form-group">
                        <label htmlFor="letter"><span>Letter:</span></label>
                        <br/>
                        <input type="text" name='letter' id='letter' onChange={this.handleChanges} value={this.state.letter} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="word"><span>Word:</span></label>
                        <br/>
                        <input type="text" name='word' id='word' onChange={this.handleChanges} value={this.state.word} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="meaning"><span>Meaning:</span></label>
                        <br/>
                        <textarea name='meaning' id='meaning' onChange={this.handleChanges} value={this.state.meaning}  cols="30" rows="10"/>
                    </div>

                    <button onClick={this.handleSubmission}>Submit</button>
                </form>
            </div>
         );
    }
}
 
export default EditMeaning;