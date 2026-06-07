import { Bell, Search, User } from 'lucide-react'

interface HeaderProps {
  sidebarWidth: string
}

export function Header({ sidebarWidth }: HeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 h-16 glass-strong z-40 flex items-center justify-between px-6 border-b border-cyan-500/10"
      style={{ left: sidebarWidth }}
    >
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search students, faculty, departments..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-500">Super Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}
