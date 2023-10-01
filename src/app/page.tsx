'use client'

export default function Home() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] text-center">
      <header className="text-2xl m-8">My Next.js App</header>

      <main className="flex flex-col items-center">
        <div className="w-80 h-96 bg-red-400"></div>
      </main>

      <footer className="text-sm m-4">
        Made by <a href="https://github.com/webdev4422">webdev4422</a>
      </footer>

      <script defer src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
    </div>
  )
}
