import { TopBar } from "@/components/ui/top-bar"

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-background text-foreground relative z-10">
      {/* Top Header Navigation */}
      <TopBar />

      {/* Main Content Workspace */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-10 flex flex-col items-center justify-center text-center">
        {/* Dashboard content goes here */}
        <p className="text-muted-foreground font-mono mt-12 opacity-50">Content Space</p>
      </main>
    </div>
  )
}

export default App
