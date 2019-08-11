import React from 'react';
import cn from 'classnames';

import Button from './Button';
import sound1 from './sounds/simonSound1.mp3'
import sound2 from './sounds/simonSound2.mp3'
import sound3 from './sounds/simonSound3.mp3'
import sound4 from './sounds/simonSound4.mp3'

const USER = 'user';
const SIMON = 'simon';
const FAILURE = 'failure';

class Board extends React.Component {
  state = {
    clicked: 0,
    simonClicks: [],
    userClicks: 0,
    mute: true,
    player: 'simon',

    // The sounds are not the same length - so we need to support the longest sound (4/blue)
    timer: 450, // ms, time to show clicked
    timerSimon: 650, // ms, time between simon clicks
    timerPlayerChange: 1000, //ms
  }

  simonSays = () => {
    // TODO: disable user clicks
    const { simonClicks } = this.state;
    this.setState({player: SIMON});
    const next = Math.floor(Math.random()*4+1);
    simonClicks.push(next);

    this.playSimonMoves();
    // TODO: enable user clicks
  }

  playSimonMoves = () => {
    let i = 0;
    const { simonClicks, timerSimon, timerPlayerChange } = this.state;
    const intervalId = setInterval(() => {
      this.select(simonClicks[i]);
      i++;
      if(i >= simonClicks.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          console.log('Users turn');
          this.setState({userClicks: 0, player: USER})
        }, timerPlayerChange);
      }
    }, timerSimon);
  }

  userSays = (index) => {
    const { userClicks, simonClicks, timerPlayerChange } = this.state;
    this.select(index);

    if(index !== simonClicks[userClicks]) {
      console.log('FAILURE ');
      this.setState({player: FAILURE});
      this.reset();
      // TODO: disable user clicks
      // TODO: change icon to failure
    } else {
      console.log('Correct ');
      this.setState({userClicks: userClicks + 1})

      // console.log('index :', index);
      // console.log('userClicks :', userClicks);
      // console.log('simonClicks.length :', simonClicks.length);
      // on change state? / componentDidChange
      if (userClicks + 1 === simonClicks.length) {
        // TODO: disable user clicks
        // TODO: change icon to simon
        setTimeout(() => {
          console.log('Simons turn');
          this.setState({player: SIMON});
          this.simonSays();
        }, timerPlayerChange)
      }
    }
  }

  playSound = (type) => {
    // const playPromise = document.getElementById(`simon${type}`).play();
    // playPromise.then().catch();

    // OR sound = new Audio(mp3).play()
    if (!this.state.mute) {
      document.getElementById(`simon${type}`).play();
    }
  }

  select = (index) => {
    this.playSound(index);
    this.setState(({clicked: index}), this.diselect );
  }

  diselect = () => {
    return setTimeout(() => this.setState({clicked: 0}), this.state.timer);
  }
  toggleMute = () => {
    return this.setState( {mute: !this.state.mute} );
  }
  reset = () => {
    return this.setState({simonClicks: [], userClicks: 0});
  }

  render() {
    const { simonClicks, mute, player } = this.state;
    const currentPlayer =  cn({
      'user-icon': player === USER,
      'simon-icon': player === SIMON,
      'failure-icon': player === FAILURE,
    });

    return <>
      <div className="Board">
        {[1,2,3,4].map((id) =>
          <Button
            key={id + ':' + id}
            type={id}
            onClick={() => this.userSays(id) }
            clicked={this.state.clicked === id}
          />)
        }
      </div>
      <div className="score">
        Score {simonClicks.length}
      </div>

      <div className="controls">
        <div className="start" onClick={this.simonSays} />
        <div className="turn">
          Playing now: <div className={currentPlayer}/>
        </div>
        <div className="sound">
          <div className={cn({mute: mute, speaker: !mute,})} onClick={() => this.toggleMute()} />
          <audio id="simon1"><source src={sound1} type="audio/mpeg" /></audio>
          <audio id="simon2"><source src={sound2} type="audio/mpeg" /></audio>
          <audio id="simon3"><source src={sound3} type="audio/mpeg" /></audio>
          <audio id="simon4"><source src={sound4} type="audio/mpeg" /></audio>
        </div>
      </div>


    </>;
  }
}

export default Board;
