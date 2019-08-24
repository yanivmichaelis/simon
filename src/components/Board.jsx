import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import Button from './Button';
import sound1 from './sounds/simonSound1.mp3'
import sound2 from './sounds/simonSound2.mp3'
import sound3 from './sounds/simonSound3.mp3'
import sound4 from './sounds/simonSound4.mp3'

const USER = 'user';
const SIMON = 'simon';
const FAILURE = 'failure';

// The sounds are not the same length - so we need to support the longest sound (4/blue)
const timer = 200; // 450ms;  time to show clicked
const timerSimon = 400; // 650ms;  time between simon clicks
const timerChangePlayerTurn = 600; //1000ms;

function Board() {
  const [clicked, setClicked] = useState(0);
  const [simonClicks, setSimonClicks] = useState([]);
  const [userClicks, setUserClicks] = useState(0);
  const [topScore, settopScore] = useState(0);
  const [mute, setMute] = useState(true);
  const [player, setPlayer] = useState(SIMON); //TODO: infer disabled

  useEffect(()=> {
    const timeout = player === USER ? timer: timerSimon;
    playSound(clicked);
    setTimeout(() => setClicked(0), timeout);
  });

  useEffect(() => {
    if(simonClicks.length > 0) {
      let i = 0;
      const intervalId = setInterval(() => {
        setClicked(simonClicks[i]);
        i++;
        if(i >= simonClicks.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            console.log('Users turn');
            setPlayer(USER);
            setUserClicks(0);
          }, timerChangePlayerTurn);
        }
      }, timerSimon);
    }
  }, [simonClicks]);

  function simonSays() {
    setPlayer(SIMON);
    const next = Math.floor(Math.random()*4+1);
    setSimonClicks(simonClicks.concat(next));
  }

  function userSays(index) {
    setClicked(index);

    if(index !== simonClicks[userClicks]) {
      setPlayer(FAILURE);
      reset();
    } else {
      setUserClicks(userClicks + 1);
      if (userClicks + 1 === simonClicks.length) {
        setTimeout(() => {
          simonSays();
        }, timerChangePlayerTurn)
      }
    }
  }

  function playSound(type) {
    // const playPromise = document.getElementById(`simon${type}`).play();
    // playPromise.then().catch();

    // OR sound = new Audio(mp3).play()
    if (!mute) {
      document.getElementById(`simon${type}`).play();
    }
  }

  function toggleMute() {
    return setMute(!mute);
  }
  function reset() {
    const numberOfMovers = simonClicks.length - 1;
    if (numberOfMovers > topScore) {
      settopScore(numberOfMovers);
    }

    setUserClicks(0);
    return setSimonClicks([]);
  }

  const currentPlayer =  cn({
    'user-icon': player === USER,
    'simon-icon': player === SIMON,
    'failure-icon': player === FAILURE,
  });

  return <>
    <div className="Board">
      {[1,2,3,4].map((id) =>
        <Button
          key={id+ clicked + player}
          type={id}
          onClick={() => userSays(id) }
          clicked={clicked === id}
        />)
      }
    </div>
    <div className="score">
      Score {simonClicks.length ? simonClicks.length - 1 : 0}
    </div>
    <div>
      High Score: {topScore}
    </div>
    <div className="controls">
      <div className="start" onClick={simonSays} />
      <div className="turn">
        Turn: <div className={currentPlayer}/>
      </div>
      <div className="sound">
        {/* <div className={cn({mute: mute, speaker: !mute,})} onClick={() => toggleMute()} /> */}
        <audio id="simon1"><source src={sound1} type="audio/mpeg" /></audio>
        <audio id="simon2"><source src={sound2} type="audio/mpeg" /></audio>
        <audio id="simon3"><source src={sound3} type="audio/mpeg" /></audio>
        <audio id="simon4"><source src={sound4} type="audio/mpeg" /></audio>
      </div>
    </div>
  </>;
}

export default Board;
