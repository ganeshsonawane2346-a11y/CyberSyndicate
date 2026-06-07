import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { NAV_ITEMS } from '../../data/sampleData'
import { iconMap } from '../../lib/icons'
import { Cpu, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      'fixed left-0 top-0 h-screen glass-strong z-50 flex flex-col transition-all duration-300',
      collapsed ? 'w-[72px]' : 'w-64'
    )}>
      <div className="p-4 border-b border-cyan-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shrink-0 glow-cyan">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-white text-sm">EduTwin AI</h2>
              <p className="text-[10px] text-cyan-400/70">Digital Twin Platform</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 border-t border-cyan-500/10 text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  )
}
