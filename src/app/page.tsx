'use client'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [time, setTime] = useState<number>(1 * 60 * 1000)
  const [sessionLength, setSessionLength] = useState<number>(1)
  const [breakLength, setBreakLength] = useState<number>(1)
  const [intervalID, setintervalID] = useState<ReturnType<typeof setInterval>>() // Set interval ID
  const [isTicking, setIsTicking] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>('SESSION')

  // setTimer function
  function setTimer() {
    let timestamp = time
    // let timestamp: number

    // if (display == 'SESSION') {
    //   timestamp = time
    // } else if (display == 'BREAK') {
    //   setTime(breakLength)
    //   timestamp = time
    // }

    const tmpIntervalID = setInterval(() => {
      timestamp -= 1000 // Subtract 1 second on each interval execution
      // // Break functionality
      // if (timestamp == 0) {
      //   timestamp = breakLength
      //   setDisplay('BREAK')
      // }
      setTime(timestamp) // Display time every 1000 ms
    }, 100) // Count down each 1000 ms
    setintervalID(tmpIntervalID) // Set intervalID for future use of clearInterval()
  }

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
    setTime(25 * 60 * 1000)
    setSessionLength(25)
    setBreakLength(5)
  }

  // Increment/Decrement Length & Break
  function incrementLength() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setTime(time + 1000 * 60)
    }
  }
  function decrementLength() {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      setTime(time - 1000 * 60)
    }
  }
  function incrementBreak() {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  }
  function decrementBreak() {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] text-center">
      <header className="text-3xl m-8">25 + 5 Clock</header>

      {/* CURRENT SESSION */}
      <main className="flex flex-col items-center">
        <div className="w-56 h-auto bg-slate-500 rounded-md p-2 m-1">
          <h2 id="timer-label" className="text-xl p-2">
            {display}
          </h2>
          <div id="time-left" className="p-1">
            {/* Convert timestamp to MM:SS on each state change. Special handle for 60:00 */}
            {sessionLength == 60 && time == 60 * 60 * 1000
              ? '60:00'
              : new Date(time).toTimeString().slice(3, 9)}
          </div>
          <button id="start_stop" className="py-1 px-4 text-2xl" onClick={startStop}>
            ⏯
          </button>
          <button id="reset" className="py-1 px-4 text-2xl" onClick={reset}>
            ↺
          </button>
        </div>

        {/* SESSION LENGTH */}
        <div className="w-56 h-auto bg-slate-700 rounded-md p-2 m-1">
          <h2 id="session-label" className="text-xl p-2">
            Session Length
          </h2>
          <div id="session-length" className="p-1">
            {sessionLength}
          </div>
          <button id="session-decrement" className="py-1 px-4 text-xl" onClick={decrementLength}>
            ▼
          </button>
          <button id="session-increment" className="py-1 px-4 text-xl" onClick={incrementLength}>
            ▲
          </button>
        </div>

        {/* SESSION BREAK */}
        <div className="w-56 h-auto bg-slate-700 rounded-md p-2 m-1">
          <h2 id="break-label" className="text-xl p-2">
            Break Length
          </h2>
          <div id="break-length" className="p-1">
            {breakLength}
          </div>
          <button id="break-decrement" className="py-1 px-4 text-xl" onClick={decrementBreak}>
            ▼
          </button>
          <button id="break-increment" className="py-1 px-4 text-xl" onClick={incrementBreak}>
            ▲
          </button>
        </div>
      </main>

      <footer className="text-sm m-4">
        Made by <a href="https://github.com/webdev4422">webdev4422</a>
      </footer>

      <script defer src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
    </div>
  )
}
