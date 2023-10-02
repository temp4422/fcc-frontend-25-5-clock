"use client";
import { useState } from "react";

export default function Home() {
  const [timer, setTimer] = useState({ session: 25, length: 25, break: 5 });

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
            {timer.session}
          </div>
          <button id="start_stop" className="py-1 px-4 text-2xl">
            ⏯
          </button>
          <button id="reset" className="py-1 px-4 text-2xl">
            ↺
          </button>
        </div>

        {/* SESSION LENGTH */}
        <div className="w-56 h-auto bg-slate-700 rounded-md p-2 m-1">
          <h2 id="session-label" className="text-xl p-2">
            Session Length
          </h2>
          <div id="session-length" className="p-1">
            {timer.length}
          </div>
          <button id="session-decrement" className="py-1 px-4 text-xl">
            ▼
          </button>
          <button id="session-increment" className="py-1 px-4 text-xl">
            ▲
          </button>
        </div>

        {/* SESSION BREAK */}
        <div className="w-56 h-auto bg-slate-700 rounded-md p-2 m-1">
          <h2 id="break-label" className="text-xl p-2">
            Break Length
          </h2>
          <div id="break-length" className="p-1">
            {timer.break}
          </div>
          <button id="break-decrement" className="py-1 px-4 text-xl">
            ▼
          </button>
          <button id="break-increment" className="py-1 px-4 text-xl">
            ▲
          </button>
        </div>
      </main>

      <footer className="text-sm m-4">
        Made by <a href="https://github.com/webdev4422">webdev4422</a>
      </footer>

      <script defer src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
    </div>
  );
}
