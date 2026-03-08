import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { StrangeTitle } from "@/components/ui/strange-title"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"
import { Description } from "./description"
import { useAuthStore } from "@/lib/store"

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <header className="sticky top-3 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm shadow-primary/5">
      <div className="flex h-16 items-center justify-between px-6 md:px-10 max-w-[1400px] mx-auto w-full">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <StrangeTitle as="h2" className="text-md sm:text-2xl md:text-2xl m-0 leading-none">Codeathon 4.0</StrangeTitle>
        </div>

        {/* Right: Desktop Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <ModeToggle />
          {isAuthenticated && (
            <Button className="hidden sm:flex" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>

        {/* Right: Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center">
          <Button size="icon" onClick={() => setIsOpen(!isOpen)} className="bg-transparent border-0 shrink-0">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-border/40 bg-background/95 backdrop-blur absolute w-full left-0 top-16 shadow-md pb-4 pt-2">
          <div className="flex flex-col items-center gap-4 px-4">
            <div className="flex w-full items-center justify-between p-2 rounded-md hover:bg-muted/50 border border-transparent">
              <Description size="lg" className="text-left">Theme</Description>
              <ModeToggle />
            </div>

            {isAuthenticated && (
              <Button className="w-full justify-center" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
