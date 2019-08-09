import React from 'react';
import cn from 'classnames';

// sounds from: https://www.freecodecamp.org/forum/t/external-mp3-audio-files/18450/2

const typeMap = {
  1: {
    color: "red",
    position: "top-left",
  },
  2: {
    color: "yellow",
    position: "top-right",
  },
  3: {
    color: "green",
    position: "bottom-left",
  },
  4: {
    color: "blue",
    position: "bottom-right",
  },
}

// Add onclick - print to console.
function Button({ type, onClick, clicked }) {
  const style = cn('button', {
    [`${typeMap[type].position}`]: true,
    [`${typeMap[type].color}`]: !clicked,
    [`${typeMap[type].color}-clicked`]: clicked,
  });

  return (
    <div className={style} onClick={(event) => onClick()} />
  );
}

export default Button;
