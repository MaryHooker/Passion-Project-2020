import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

class ViewAllLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      knowledge: [],
    }
  }

  //when component mounts, run inner function
  componentDidMount() {
    this.loadMeaning();
  }

  //Function to fetch all dream links to share from database
  loadMeaning = async() => {
    let response = await fetch('/api/links', {
      method: "GET"
    })
    let json = await response.json()
    //sanity
    console.table(json)
    //place data in state
    this.setState({
      knowledge: json
    })
    //sanity
    console.table(`Admin : Knowledge Links ${JSON.stringify(json)}`)
  }

  //    // go back one page
  //    goBack = () => {
  //     window.history.back();
  // }

  //Function to delete a link from the database
  deleteLink = async() => {
    let response = await fetch(`/api/links/${this.state.knowledge.id}`, {
      method: "DELETE"
    })
    let json = await response.json();
    //sanity
    console.log(`Deleting Link ${JSON.stringify(json)}`)

  // this.goBack();
  }

  render() {
    return (
      <div>
                <Link to='/knowledge/links/create' className='linkLink'><img src="../addSymbol2.png" alt="addSymbol"/></Link>
                <br/>
                <br/>
                <div className='linksContainer'>
                {
      this.state.knowledge.map((link) => {
        return (
          <div key={link._id} className='dreamersDisplay'>
                                <p className='listedData'>{link.title}</p>
                                <p className='listedData'>{link.author}</p>
                                <Link to={`/knowledge/links/details/${link._id}`} className='linkLink'><Button className='allButton'>Details</Button></Link>  
                            </div>
                                                          
          

        )
      })
      }

                </div> 
            </div>
    )
  }
}

export default ViewAllLinks;