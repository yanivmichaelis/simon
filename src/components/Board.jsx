import React from 'react';
import Button from './Button';

const listOfClicks = [];

const moves = (type) => () => {
  listOfClicks.push(type)
  console.log(listOfClicks);
  return ;
}

function Board() {
  return (
    <div className="Board">
      {[1,2,3,4].map((id) => <Button key={id + ' ' + id} type={id} onClick={moves(id)} />)}
    </div>
  );
}

export default Board;

// state = {
//   turn: pc/human,
//   timer: xxx,
//   moves: [list of moves],
// }
