'use client'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60 * 1000) // Timestamp
  const [sessionLength, setSessionLength] = useState<number>(25)
  const [breakLength, setBreakLength] = useState<number>(5)
  const [intervalID, setIntervalID] = useState<ReturnType<typeof setInterval>>() // Set interval ID
  const [isTicking, setIsTicking] = useState<boolean>(false)
  const [timerLabel, setTimerLabel] = useState<string>('SESSION')

  // Play/Stop audio. Must fetch audio before rendering, so audio is ready onClick event
  const audioElement = (
    <audio
      id="beep"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    ></audio>
  )
  function playAudio() {
    const audioElement = document.querySelector('#beep') as HTMLAudioElement
    audioElement.play().catch((e) => console.log(e))
  }
  function stopAudio() {
    const audioElement = document.querySelector('#beep') as HTMLAudioElement
    audioElement.pause()
    audioElement.load()
  }

  // setTimer function
  function setTimer() {
    let timestamp = timeLeft

    const tmpIntervalID = setInterval(() => {
      timestamp -= 1000 // Subtract 1 sec on each interval execution
      setTimeLeft(timestamp) // Display time every 1 sec

      if (timestamp == 0 && timerLabel == 'SESSION') {
        // Wrap forward execution in 1 sec delay to properly display timerLabel, because, values are changed instantly and '00:00' never shows
        setTimeout(() => {
          setTimerLabel('BREAK')
          clearInterval(tmpIntervalID)
          setTimeLeft(breakLength * 60 * 1000)
          playAudio()
        }, 1000)
      }
      if (timestamp == 0 && timerLabel == 'BREAK') {
        setTimeout(() => {
          setTimerLabel('SESSION')
          clearInterval(tmpIntervalID)
          setTimeLeft(sessionLength * 60 * 1000)
          playAudio()
        }, 1000)
      }
    }, 1000) // Countdown each 1 sec
    setIntervalID(tmpIntervalID) // Set intervalID for future use of clearInterval()
  }

  useEffect(() => {
    // Repeat timer execution on display value change, e.g. SESSION and BREAK
    if (isTicking) {
      setTimer()
    }
  }, [timerLabel])

  function startStop() {
    if (isTicking) {
      // STOP
      setIsTicking(false)
      clearInterval(intervalID)
    } else {
      // START
      setIsTicking(true)
      setTimer()
    }
  }

  function reset() {
    setIsTicking(false)
    clearInterval(intervalID)
    setTimeLeft(25 * 60 * 1000)
    setSessionLength(25)
    setBreakLength(5)
    stopAudio()
    setTimerLabel('SESSION')
  }

  // Increment/Decrement Length & Break
  function incrementLength() {
    if (sessionLength < 60 && !isTicking) {
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 1000 * 60)
    }
  }
  function decrementLength() {
    if (sessionLength > 1 && !isTicking) {
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 1000 * 60)
    }
  }
  function incrementBreak() {
    if (breakLength < 60 && !isTicking) {
      setBreakLength(breakLength + 1)
    }
  }
  function decrementBreak() {
    if (breakLength > 1 && !isTicking) {
      setBreakLength(breakLength - 1)
    }
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] text-center">
      <header className="m-8 text-3xl">25 + 5 Clock</header>

      {/* CURRENT SESSION */}
      <main className="flex flex-col items-center ">
        <div className="w-56 h-auto p-2 m-1 rounded-md bg-slate-500">
          <h2 id="timer-label" className="p-2 text-xl">
            {timerLabel}
          </h2>
          <div id="time-left" className="p-1">
            {/* Convert timestamp to MM:SS on each state change. Special handle for 60:00 */}
            {sessionLength == 60 && timeLeft == 60 * 60 * 1000
              ? '60:00'
              : new Date(timeLeft).toTimeString().slice(3, 9)}
          </div>
          <button id="start_stop" className="px-4 py-1 text-2xl" onClick={startStop}>
            ⏯
          </button>
          <button id="reset" className="px-4 py-1 text-2xl" onClick={reset}>
            ↺
          </button>
        </div>

        {/* SESSION LENGTH */}
        <div className="w-56 h-auto p-2 m-1 rounded-md bg-slate-700">
          <h2 id="session-label" className="p-2 text-xl">
            Session Length
          </h2>
          <div id="session-length" className="p-1">
            {sessionLength}
          </div>
          <button id="session-decrement" className="px-4 py-1 text-xl" onClick={decrementLength}>
            ▼
          </button>
          <button id="session-increment" className="px-4 py-1 text-xl" onClick={incrementLength}>
            ▲
          </button>
        </div>

        {/* SESSION BREAK */}
        <div className="w-56 h-auto p-2 m-1 rounded-md bg-slate-700">
          <h2 id="break-label" className="p-2 text-xl">
            Break Length
          </h2>
          <div id="break-length" className="p-1">
            {breakLength}
          </div>
          <button id="break-decrement" className="px-4 py-1 text-xl" onClick={decrementBreak}>
            ▼
          </button>
          <button id="break-increment" className="px-4 py-1 text-xl" onClick={incrementBreak}>
            ▲
          </button>
        </div>
      </main>

      <footer className="m-4 text-sm">
        Made by <a href="https://github.com/webdev4422">webdev4422</a>
      </footer>

      {audioElement}

      <script defer src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
    </div>
  )
}
