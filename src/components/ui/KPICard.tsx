import { cn } from '../../lib/utils'
import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: number
  color?: 'cyan' | 'purple' | 'green' | 'amber' | 'red'
}

const colorMap = {
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400',
  green: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
  amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400',
  red: 'from-red-500/20 to-red-500/5 border-red-500/30 text-red-400',
}

export function KPICard({ title, value, subtitle, icon: Icon, trend, color = 'cyan' }: KPICardProps) {
  return (
    <div className={cn('glass rounded-xl p-5 bg-gradient-to-br transition-all hover:scale-[1.02] hover:glow-cyan', colorMap[color])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={cn('p-2.5 rounded-lg bg-white/5', colorMap[color].split(' ').pop())}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend !== undefined && (
        <div className={cn('flex items-center gap-1 mt-3 text-xs font-medium', trend >= 0 ? 'text-emerald-400' : 'text-red-400')}>
          {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}% vs last semester
        </div>
      )}
    </div>
  )
}
