import React from 'react';
import cn from 'classnames';

import Button from './Button';
import sound1 from './sounds/simonSound1.mp3'
import sound2 from './sounds/simonSound2.mp3'
import sound3 from './sounds/simonSound3.mp3'
import sound4 from './sounds/simonSound4.mp3'

class Board extends React.Component {
  state = {
    clicked: 0,
    listOfClicks: [3, 4, 4, 1, 3, 2, 3, 4], //[],
    mute: true,

    // The sounds are not the same length - so we need to support the longest sound (4/blue)
    timer: 450, // ms, time to show clicked
    timerSimon: 650, // ms, time between simon clicks
  }

  simonSays = () => {
    // disable user clicks?
    const { listOfClicks }= this.state;
    const next = Math.floor(Math.random()*4+1);
    listOfClicks.push(next);

    this.playSimonMoves();
    // wait for user input
    // enable user clicks
  }

  playSimonMoves = () => {
    let i = 0;
    const { listOfClicks } = this.state;
    const intervalId = setInterval(() => {
      this.select(listOfClicks[i])();
      i++;
      if(i >= listOfClicks.length) {
        clearInterval(intervalId);
      }
    }, this.state.timerSimon);
  }

  userSays = () => {

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
    return () => {
      console.log(this.state.listOfClicks);

      this.playSound(index);
      this.setState(({clicked: index}), this.diselect );
      };
  }

  diselect = () => {
    return setTimeout(() => this.setState( {clicked: 0} ), this.state.timer);
  }
  toggleMute = () => {
    return this.setState( {mute: !this.state.mute} );
  }
  reset = () => {
    return this.setState( {listOfClicks: []} );
  }

  render() {
    const { listOfClicks, mute }= this.state;
    return <>
      <div className="Board">
        {[1,2,3,4].map((id) =>
          <Button
            key={id + ':' + id}
            type={id}
            onClick={this.select(id)}
            clicked={this.state.clicked === id}
          />)
        }
      </div>
      <div className="controls">
        <div className="turn">
          PC |----| User |----| Error
        </div>

        <div className="start" onClick={this.simonSays  }>
          Start |>
        </div>

        <div className="reset" onClick={this.reset} >
          {`Reset <--`}
        </div>

        <div className="score">
          Score {listOfClicks.length}
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

// state = {
//   turn: pc/human,
//   moves: [list of moves],
// }
