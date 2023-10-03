'use client'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [currentSession, setCurrentSession] = useState<number>(25 * 60 * 1000)
  const [sessionLength, setSessionLength] = useState<number>(25)
  const [sessionBreak, setSessionBreak] = useState<number>(5)
  const [intervalID, setintervalID] = useState<ReturnType<typeof setInterval>>() // Set interval ID
  const [isTicking, setIsTicking] = useState<boolean>(false)

  // setTimer function
  function setTimer() {
    let timestamp = currentSession
    const tmpIntervalID = setInterval(() => {
      timestamp -= 1000 // Subtract 1 second on each interval execution
      setCurrentSession(timestamp) // Display time every 1000 ms
    }, 1000) // Count down each 1000 ms
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
    setCurrentSession(25 * 60 * 1000)
    setSessionLength(25)
    setSessionBreak(5)
  }

  // Increment/Decrement Length & Break
  function incrementLength() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setCurrentSession(currentSession + 1000 * 60)
    }
  }
  function decrementLength() {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      setCurrentSession(currentSession - 1000 * 60)
    }
  }
  function incrementBreak() {
    if (sessionBreak < 60) {
      setSessionBreak(sessionBreak + 1)
    }
  }
  function decrementBreak() {
    if (sessionBreak > 1) {
      setSessionBreak(sessionBreak - 1)
    }
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] text-center">
      <header className="text-3xl m-8">25 + 5 Clock</header>

      {/* CURRENT SESSION */}
      <main className="flex flex-col items-center">
        <div className="w-56 h-auto bg-slate-500 rounded-md p-2 m-1">
          <h2 id="timer-label" className="text-xl p-2">
            Session
          </h2>
          <div id="time-left" className="p-1">
            {/* Convert timestamp to MM:SS on each state change */}
            {new Date(currentSession).toTimeString().slice(3, 9)}
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
