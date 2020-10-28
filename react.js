import React, { useState, useRef, useEffect } from 'react';
import video from './video.mp4';

//5 ~ 7

function App() {
  const ref = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeatMode, setRepeatMode] = useState(false);
  const [repeatTime, setRepeatTime] = useState(0);

  useEffect(() => {
    if(!ref.current || !repeatMode) return;

    if(currentTime > repeatTime + 2 || currentTime < repeatTime) {
      ref.current.currentTime = repeatTime;
    }
  }, [ref, currentTime, repeatMode]);
  
  function play() {
    if (!ref.current) return;
    ref.current.play();
  }

  function pause() {
    if (!ref.current) return;
    ref.current.pause();
  }

  function repeat() {
    if(repeatMode)
      return setRepeatMode(false);
    setRepeatTime(ref.current.currentTime);
    setRepeatMode(true);
  }
	
	return (
		<div>
      <video src={video} autoPlay style={{width: '100%', maxWidth: '540px' }} ref={ref}
      
        onDurationChange={() => {
          ref.current && setDuration(ref.current.duration);
        }}

        onTimeUpdate = {() => {
          ref.current && setCurrentTime(ref.current.currentTime);
        }}
      />
			<div>
				<button onClick={play}>재생</button>
				<button onClick={pause}>정지</button>
				<button onClick={repeat}>{repeatMode ? "반복 해제" : "반복"}</button>
			</div>
      <div>
        {currentTime}/{duration}  {parseInt(currentTime/duration * 100)}%
      </div>
		</div>
	);
}

export default App;

//https://developer.mozilla.org/ko/docs/Web/API/HTMLVideoElement
