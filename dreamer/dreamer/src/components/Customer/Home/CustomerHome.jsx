import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dreams: [],
      //word entered in search bar when looking up a meaning
      word: "",
    }
  }

        //when component mounts, runner inner function
        componentDidMount(){
            this.allDreams();
        }
    
         //Function to fetch all posted dreams from database
         allDreams = async() => {
            let response = await fetch('/api/dreams/all/posted/true',{
                method:"GET"
            })
            let json = await response.json();
          
            //place data in state
            this.setState({
                dreams : json
            })
            //sanity
            console.log(json)
    
        }

  // handle changes to fields
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <div className='dreamerHomeContainer'>
                {/* <div className='adminTitle'>
                <h2>Welcome back <span className='userName'>{this.props.tokenUser.name}</span>!</h2>
                </div> */}
                <br/>
                <div className='meLinkP'>
                <Link to='/me' className='dreamersLink'><button className='dreamerHomeButton1'>Me</button></Link>
                </div>
                <div className='myDreamsLinkP'>
                <Link to='/myDreams' className='dreamersLink'><button className='dreamerHomeButton4'>My Dreams</button></Link>
                </div>
                <div className='dreamerForum'>
                    <h4>Dreamer's Dreams</h4>
                    <div className='dreamPostDisplay'>
                {
                    this.state.dreams.map((dream) => {
                        return(
                            <div key={dream._id} className='eachPost'>
                            {/* <Link to={`/dreams/posted/view/one/${dream._id}`} className='linkLink'> */}
                            <p className='listedDataPostType'>{dream.type}</p>
                            <p className='listedDataPost'>{dream.dreamDescription}</p>
                            {
                                dream.dreamer.map((dreamer) => {
                                    return(
                                        <div key={dreamer._id}>
                                            <p className='listedDataDreamer'>{dreamer.name}</p>
                                        </div>
                                    )
                                })
                            }
                          
                        </div>
                        )
                    })

                }
                </div>
                </div>
                <div className='dreamerKnowledgeLinkP'>
                <Link to='/dreamer/knowledge' className='dreamersLink'><button className='dreamerHomeButton5'>Knowledge</button></Link>
                </div>
                <div className='spotlightLinkP'>
                <Link to='/dreamer/spotlighted' className='dreamersLink'><button className='spotlightHomeButton56'>Spotlighted</button></Link>
                </div>
                <div className='dreamerMeaningsLinkP'>
                    <h4>Meanings</h4>
                <Link to='/dreamer/meanings' className='dreamersLink'><span className='meaningsAll'>All</span></Link>
                <br/>
                <br/>
                <Link to={`/meanings/letter/${'A'}`} className='noLineLinks'><span className='meaningLetters'>A</span></Link>
                <Link to={`/meanings/letter/${'B'}`} className='noLineLinks'><span className='meaningLetters'>B</span></Link>
                <Link to={`/meanings/letter/${'C'}`} className='noLineLinks'><span className='meaningLetters'>C</span></Link>
                <Link to={`/meanings/letter/${'D'}`} className='noLineLinks'><span className='meaningLetters'>D</span></Link>
                <Link to={`/meanings/letter/${'E'}`} className='noLineLinks'><span className='meaningLetters'>E</span></Link>
                <Link to={`/meanings/letter/${'F'}`} className='noLineLinks'><span className='meaningLetters'>F</span></Link>
                <Link to={`/meanings/letter/${'G'}`} className='noLineLinks'><span className='meaningLetters'>G</span></Link>
                <Link to={`/meanings/letter/${'H'}`} className='noLineLinks'><span className='meaningLetters'>H</span></Link>
                <Link to={`/meanings/letter/${'I'}`} className='noLineLinks'><span className='meaningLetters'>I</span></Link>
                <Link to={`/meanings/letter/${'J'}`} className='noLineLinks'><span className='meaningLetters'>J</span></Link>
                <Link to={`/meanings/letter/${'K'}`} className='noLineLinks'><span className='meaningLetters'>K</span></Link>
                <Link to={`/meanings/letter/${'L'}`} className='noLineLinks'><span className='meaningLetters'>L</span></Link>
                <Link to={`/meanings/letter/${'M'}`} className='noLineLinks'><span className='meaningLetters'>M</span></Link>
                <Link to={`/meanings/letter/${'N'}`} className='noLineLinks'><span className='meaningLetters'>N</span></Link>
                <Link to={`/meanings/letter/${'O'}`} className='noLineLinks'><span className='meaningLetters'>O</span></Link>
                <Link to={`/meanings/letter/${'P'}`} className='noLineLinks'><span className='meaningLetters'>P</span></Link>
                <Link to={`/meanings/letter/${'Q'}`} className='noLineLinks'><span className='meaningLetters'>Q</span></Link>
                <Link to={`/meanings/letter/${'R'}`} className='noLineLinks'><span className='meaningLetters'>R</span></Link>
                <Link to={`/meanings/letter/${'S'}`} className='noLineLinks'><span className='meaningLetters'>S</span></Link>
                <Link to={`/meanings/letter/${'T'}`} className='noLineLinks'><span className='meaningLetters'>T</span></Link>
                <Link to={`/meanings/letter/${'U'}`} className='noLineLinks'><span className='meaningLetters'>U</span></Link>
                <Link to={`/meanings/letter/${'V'}`} className='noLineLinks'><span className='meaningLetters'>V</span></Link>
                <Link to={`/meanings/letter/${'W'}`} className='noLineLinks'><span className='meaningLetters'>W</span></Link>
                <Link to={`/meanings/letter/${'X'}`} className='noLineLinks'><span className='meaningLetters'>X</span></Link>
                <Link to={`/meanings/letter/${'Y'}`} className='noLineLinks'><span className='meaningLetters'>Y</span></Link>
                <Link to={`/meanings/letter/${'Z'}`} className='noLineLinks'><span className='meaningLetters'>Z</span></Link>
                <br/>
                        <form>
                            <label htmlFor="word"><span>Word </span></label>
                            <input type="text" name="word" id="word" onChange={this.handleChange} />
                            <Link to={`/meanings/word/${this.state.word}`}><button>Search</button></Link>
                        </form>
                </div>
            </div>
      );
  }
}

export default CustomerHome;