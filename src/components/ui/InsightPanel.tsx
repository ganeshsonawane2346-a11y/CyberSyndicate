import { cn } from '../../lib/utils'
import { AlertTriangle, TrendingUp, Zap, Info } from 'lucide-react'
type Insight = {
  type: string
  title: string
  description: string
  severity: string
}

const severityConfig = {
  critical: { icon: AlertTriangle, color: 'border-red-500/40 bg-red-500/10 text-red-400' },
  warning: { icon: Zap, color: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
  success: { icon: TrendingUp, color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
  info: { icon: Info, color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400' },
}

export function InsightPanel({ insights }: { insights: Insight[] }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <h3 className="text-sm font-semibold text-white">AI Insights</h3>
        <span className="text-xs text-slate-500 ml-auto">Live</span>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const config = severityConfig[insight.severity as keyof typeof severityConfig]
          const Icon = config.icon
          return (
            <div key={i} className={cn('flex gap-3 p-3 rounded-lg border', config.color)}>
              <Icon className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">{insight.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{insight.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
