import React from 'react';
import cn from 'classnames';

const typeMap = {
  1: "red",
  2: "yellow",
  3: "green",
  4: "blue",
}

// Add onclick - print to console.
function Button({ type, onClick, clicked }) {
  const style = cn({
    [`${typeMap[type]}`]: !clicked,
    [`${typeMap[type]}-clicked`]: clicked,
  }, 'button');

  return (
    <div className={style} onClick={(event) => onClick()}>
      {type}: {typeMap[type]}
    </div>
  );
}

export default Button;
