import React, { Component } from 'react';
import TipButton from './TipButton.js'

class Main extends Component {
  constructor() {
    super();

    this.state = {
      games: []
    }
  }

  componentDidMount() {
    this.gamesList();
  }

  gamesList() {
    var self = this;
    return fetch('/api', {
      accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        //console.log(data);
        self.setState({ games: data });
      });


    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error); // eslint-disable-line no-console
      throw error;
    }
    function parseJSON(response) {
      return response.json();
    }
  }
  render() {
    const matches = this.state.games.map((item, i) => {
      return (
        <div key={item._id}>
          <p>{item.gameName}</p>
          <p>{item.eventStart}</p>
          <p>{item.categoryName}</p>
          <p>{item.markets['0']['0'].n} : <TipButton item={item} tip={item.markets['0']['1']} addTip={this.props.addTip} /></p> 
          <p>{item.markets['0']['1'].n} : <TipButton item={item} tip={item.markets['0']['1']} addTip={this.props.addTip} /></p> 
          <p>{item.markets['0']['2'].n} : <TipButton item={item} tip={item.markets['0']['2']} addTip={this.props.addTip} /></p> 

        </div>
      )
    })
    return (
   
        <div className="col-sm-9"> 
          {matches} 
        </div>
  
    );
  }
}

export default Main;