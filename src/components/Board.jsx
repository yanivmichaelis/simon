import React from 'react';
import Button from './Button';

const listOfClicks = [];

class Board extends React.Component {
  state = {
    clicked: 0,
    timer: 250, // ms, time to show clicked
  }

  select = (type) => {
    return () => {
      listOfClicks.push(type);
      console.log(listOfClicks);

      this.setState(({clicked: type}), this.diselect );
      };
  }

  diselect = () => {
    return setTimeout(() => this.setState( {clicked: 0} ), this.state.timer);
  }

  render() {
    return (
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
    );
  }
}

export default Board;

// state = {
//   turn: pc/human,
//   timer: xxx,
//   moves: [list of moves],
// }
