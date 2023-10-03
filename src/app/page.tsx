'use client'
import { useState } from 'react'

export default function Home() {
  // let date: Date = new Date()
  // const [currentSession, setCurrentSession] = useState<any>(25)
  const [sessionLength, setSessionLength] = useState<number>(25)
  const [sessionBreak, setSessionBreak] = useState<number>(5)
  const [intervalID, setintervalID] = useState<ReturnType<typeof setInterval>>() // Make id global

  // setTimer function
  function setTimer() {
    let timeMs = sessionLength * 60 * 1000 // Convert min to ms = min * sec * ms
    const tmpIntervalID = setInterval(() => {
      timeMs -= 1000 // Subtract 1 second on each interval execution
      let timeMinSec: any = new Date(timeMs).toLocaleTimeString([], {
        minute: '2-digit',
        second: '2-digit',
      }) // Convert ms to min:sec
      setSessionLength(timeMinSec) // Display time every 1000 ms
    }, 1000) // Count down each 1000 ms
    setintervalID(tmpIntervalID) // Set intervalID for future use of clearInterval()
  }

  function startStop() {
    setTimer()
  }

  function reset() {
    window.clearInterval(intervalID) // Remove interval from window object
    setSessionLength(25)
    setSessionLength(25)
    setSessionBreak(5)
  }

  // Increment/Decrement Length & Break
  function incrementLength() {
    setSessionLength(sessionLength + 1)
  }
  function decrementLength() {
    setSessionLength(sessionLength - 1)
  }
  function incrementBreak() {
    setSessionBreak(sessionBreak + 1)
  }
  function decrementBreak() {
    setSessionBreak(sessionBreak - 1)
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] text-center">
      <header className="text-3xl m-8">25 + 5 Clock</header>

      {/* SESSION */}
      <main className="flex flex-col items-center">
        <div className="w-56 h-auto bg-slate-500 rounded-md p-2 m-1">
          <h2 id="timer-label" className="text-xl p-2">
            Session
          </h2>
          <div id="time-left" className="p-1">
            {sessionLength}
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
            {sessionBreak}
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
