import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dreams: [],
      //word entered in search bar when looking up a meaning
      word: "",
      knowledge: [],
      // spotlighted: [],
     }
  }

    //when component mounts, runner inner function
    componentDidMount() {
      this.allDreams();
      this.loadKnowledge();
      // this.loadSpotlight();
    }


  //Function to fetch all posted dreams from database
  allDreams = async() => {
    let response = await fetch('/api/dreams/all/posted/true', {
      method: "GET"
    })
    let json = await response.json();

    //place data in state
    this.setState({
      dreams: json
    })
    //sanity
    console.log(json)

  }

  //Function to fetch all dream links/knowledge to share from database
  loadKnowledge = async() => {
    let response = await fetch('/api/links', {
      method: "GET"
    })
    let json = await response.json();
    //sanity
    console.table(json)
    //place data in state
    this.setState({
      knowledge: json
    })
    //sanity
    console.table(`Admin : Knowledge Links ${JSON.stringify(json)}`)
  }


  // //function to fetch method to render all spotlighted dreams
  // loadSpotlight = async() => {
  //   let response = await fetch(`/api/dreams/all/spotlight/true`, {
  //     method: "GET",

  //   })
  //   let json = await response.json();
  //   //sanity
  //   console.log(`All Spotlighted Dreams ${JSON.stringify(json)}`)
  //   //place in state
  //   this.setState(
  //     {
  //       spotlighted: json
  //     }
  //   )
  // }

  // handle changes to fields
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  render() {
    return (
      <div className='adminHomeContainer'>
                {/* ////////////////////////////// Admin //////////////////////////////////// */}
                <Link to='/admin/view/all' className='meLinkP'>
                  <h3>Admin</h3>
                  <img src="../telescope1.png" alt="admin" className='avatarImage'/>
                  </Link>
                 {/* ////////////////////////////// Dreamers //////////////////////////////////// */}

  
                <Link to='/view/dreamers' className='dreamersLink' className='myDreamsLinkP'>
                  <h3>Dreamers</h3>
                  <img src="../earth7.png" alt="dreamers"/>
                  </Link>
      
                <div className='dreamerMeaningPosition'>
               
               
               <div className='dreamerMeaningsLinkP'>
               <h3>Symbolism</h3>
               <Link to='/view/meanings' className='dreamersLink'><span className='meaningsAll'>All</span></Link>
               <br/>
               <form>
                           <label htmlFor="word"><span> </span></label>
                           <input type="text" name="word" id="word" onChange={this.handleChange} className='searchInput'/>
                           <Link to={`/meanings/word/${this.state.word}`}><button className='searchButton'>Search</button></Link>
                       </form>
                      
                       <div className='lettersContainer'>
               <Link to={`/meanings/letter/${'A'}`} className='noLineLinks'><img src="../A2.png" alt="A"/></Link>
               <Link to={`/meanings/letter/${'B'}`} className='noLineLinks'><img src="../B.png" alt="B"/></Link>
               <Link to={`/meanings/letter/${'C'}`} className='noLineLinks'><img src="../C3.png" alt="C"/></Link>
               <Link to={`/meanings/letter/${'D'}`} className='noLineLinks'><img src="../D.png" alt="D"/></Link>
               <Link to={`/meanings/letter/${'E'}`} className='noLineLinks'><img src="../E6.png" alt="E"/></Link>
               <Link to={`/meanings/letter/${'F'}`} className='noLineLinks'><img src="../F2.png" alt="F"/></Link>
               <Link to={`/meanings/letter/${'G'}`} className='noLineLinks'><img src="../G2.png" alt="G"/></Link>
               <Link to={`/meanings/letter/${'H'}`} className='noLineLinks'><img src="../H2.png" alt="H"/></Link>
               <Link to={`/meanings/letter/${'I'}`} className='noLineLinks'><img src="../I2.png" alt="I"/></Link>
               <Link to={`/meanings/letter/${'J'}`} className='noLineLinks'><img src="../J2.png" alt="J"/></Link>
               <Link to={`/meanings/letter/${'K'}`} className='noLineLinks'><img src="../K2.png" alt="K"/></Link>
               <Link to={`/meanings/letter/${'L'}`} className='noLineLinks'><img src="../L2.png" alt="L"/></Link>
               <Link to={`/meanings/letter/${'M'}`} className='noLineLinks'><img src="../M2.png" alt="M"/></Link>
               <Link to={`/meanings/letter/${'N'}`} className='noLineLinks'><img src="../N2.png" alt="N"/></Link>
               <Link to={`/meanings/letter/${'O'}`} className='noLineLinks'><img src="../O2.png" alt="O"/></Link>
               <Link to={`/meanings/letter/${'P'}`} className='noLineLinks'><img src="../P2.png" alt="P"/></Link>
               <Link to={`/meanings/letter/${'Q'}`} className='noLineLinks'><img src="../Q2.png" alt="Q"/></Link>
               <Link to={`/meanings/letter/${'R'}`} className='noLineLinks'><img src="../R2.png" alt="R"/></Link>
               <Link to={`/meanings/letter/${'S'}`} className='noLineLinks'><img src="../S2.png" alt="S"/></Link>
               <Link to={`/meanings/letter/${'T'}`} className='noLineLinks'><img src="../T2.png" alt="T"/></Link>
               <Link to={`/meanings/letter/${'U'}`} className='noLineLinks'><img src="../U2.png" alt="U"/></Link>
               <Link to={`/meanings/letter/${'V'}`} className='noLineLinks'><img src="../V2.png" alt="V"/></Link>
               <Link to={`/meanings/letter/${'W'}`} className='noLineLinks'><img src="../W2.png" alt="W"/></Link>
               <Link to={`/meanings/letter/${'X'}`} className='noLineLinks'><img src="../X2.png" alt="X"/></Link>
               <Link to={`/meanings/letter/${'Y'}`} className='noLineLinks'><img src="../Y2.png" alt="Y"/></Link>
               <Link to={`/meanings/letter/${'Z'}`} className='noLineLinks'><img src="../Z2.png" alt="Z"/></Link>
               </div>
               </div>
               <br/>
                { /* <Link to='/view/meanings' className='meaningsLink'><button className='adminHomeButton3'>Meanings</button></Link> */ }
                </div>
                { /* /////////////////////////// Dreamer's Dreams //////////////////////////////////// */ }
                <div className='dreamerForum'>
                <Link to='/dreams/view/all' className='manageKnowledgeLinks' ><h3>The Collective</h3></Link>

                        { /* <iframe src={<DreamerViewAllPostedDreams/>} frameborder="0"> */ }
                        <div className='dreamPostDisplayAdmin'>
                {
      this.state.dreams.map((dream) => {
        return (
          <div key={dream._id} className='eachPost'>
                            { /* <Link to={`/dreams/posted/view/one/${dream._id}`} className='linkLink'> */ }
                            <p className='listedDataPostType'>{dream.type}</p>
                            <p className='listedDataPost'>{dream.dreamDescription}</p>
                            {
          dream.dreamer.map((dreamer) => {
            return (
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
                { /* </iframe> */ }
               
                </div>
                { /* /////////////////////////// Dream Knowledge //////////////////////////////////// */ }
                <div className='dreamerKnowledgeLinkP'>
                <Link to='/knowledge/links' className='manageKnowledgeLinks'><h3>Knowledge</h3></Link>
                {/* <Link path='/knowledge/links/create'><img src="../addSymbol2.png" alt="add"/></Link>  */}
                <div className='dreamKnowledgeDisplay'>
                {
      this.state.knowledge.map((link) => {
        return (
          <div key={link._id} className='eachLink'>
                                <a href={link.link} className='noLineLinksK' target="_blank">
                                <p className='listedDataPost'>{link.title}</p>
                                { /* <p className='listedData'>{link.link}</p> */ }
                                <p className='listedDataDreamer'>{link.author}</p>
                                </a>
                            </div>
        )
      })
      }
                </div>    
                { /* <Link to='/dreamer/knowledge' className='dreamersLink'><span className='dreamerHomeButton5'>Knowledge</span></Link> */ }
                </div>
            </div>
      );
  }
}

export default AdminHome;