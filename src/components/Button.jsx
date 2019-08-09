import React from 'react';
import '../App.css';

const typeMap = {
  1: "red",
  2: "yellow",
  3: "green",
  4: "blue",
}

// Add onclick - print to console.
function Button({ type, onClick}) {
  return (
    <div className={typeMap[type] + ' button'} onClick={(event) => onClick()}>
      {type}: {typeMap[type]}
    </div>
  );
}

export default Button;
