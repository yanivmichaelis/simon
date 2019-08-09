import React from 'react';
import Button from './Button';
import sound1 from './sounds/simonSound1.mp3'
import sound2 from './sounds/simonSound2.mp3'
import sound3 from './sounds/simonSound3.mp3'
import sound4 from './sounds/simonSound4.mp3'

class Board extends React.Component {
  state = {
    clicked: 0,
    listOfClicks: [],
    timer: 250, // ms, time to show clicked
  }

  play = (type) => {
    const playPromise = document.getElementById(`simon${type}`).play();
    // playPromise.then().catch();
  }

  select = (type) => {
    return () => {
      this.state.listOfClicks.push(type);
      console.log(this.state.listOfClicks);

      // play tune
      this.play(type);
      this.setState(({clicked: type}), this.diselect );
      };
  }

  diselect = () => {
    return setTimeout(() => this.setState( {clicked: 0} ), this.state.timer);
  }

  render() {
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
      <div>
        <audio id="simon1">
          <source src={sound1} type="audio/mpeg" />
        </audio>
        <audio id="simon2">
          <source src={sound2} type="audio/mpeg" />
        </audio>
        <audio id="simon3">
          <source src={sound3} type="audio/mpeg" />
        </audio>
        <audio id="simon4">
          <source src={sound4} type="audio/mpeg" />
        </audio>
      </div>
    </>;
  }
}

export default Board;

// state = {
//   turn: pc/human,
//   moves: [list of moves],
// }
