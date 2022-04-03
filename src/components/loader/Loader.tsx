import React from 'react';
import './loader.css';
import Context from 'services/Context'; 

 class Loader extends React.Component {
  static contextType = Context;

  private randomMessage = [
    // 'Looking for',
    // 'Let\'s see what I can find for ',
    'Why YouTube didn\'t put this basic option ? ',
    'So many videos on YouTube...',
    'Looking over 14,595,197,433 of videos...'
  ]

  private message = '';

  constructor (props: any) {
    super(props);
    this.generateRandomMessage();
  }


  componentWillUnmount () {
    this.message = '';
  }

  private generateRandomMessage () {
    const hours = (new Date()).getHours();
    if ( hours >= 2 && hours <= 5 ) {
      this.message = 'You should go to sleep ⚆_⚆';
    } else {
      this.message =this.randomMessage[Math.floor(Math.random()*this.randomMessage.length)];
    }
  }

  render () {
    return (
      <div id="loader-wrapper">
        <div id="loader"></div>
        <span id="message">{ this.message }</span>
      </div>
      
    )
  }
}

export default Loader;