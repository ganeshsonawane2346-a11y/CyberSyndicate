import { useState, useMemo } from 'react'
import { FlaskConical, Zap } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PageHeader } from '../components/ui/PageHeader'
import { ChartCard } from '../components/ui/ChartCard'
import { SIMULATION_PARAMS } from '../data/sampleData'

export function SimulationLab() {
  const [params, setParams] = useState<Record<string, number>>({
    attendance: 0, courses: 0, faculty: 0, partnerships: 0, certifications: 0,
  })

  const outcomes = useMemo(() => {
    const passRate = 84 + params.attendance * 0.8 + params.courses * 1.2 + params.faculty * 0.5
    const placementRate = 78 + params.attendance * 0.5 + params.partnerships * 1.8 + params.certifications * 2.0 + params.courses * 1.5
    const dropoutRisk = Math.max(2, 12 - params.attendance * 1.2 - params.faculty * 0.4 - params.certifications * 0.6)
    const readiness = 72 + params.certifications * 3 + params.courses * 2.5 + params.partnerships * 1.5
    const avgSalary = 6.8 + params.partnerships * 0.15 + params.certifications * 0.2 + params.courses * 0.1

    return { passRate, placementRate, dropoutRisk, readiness, avgSalary }
  }, [params])

  const projectionData = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      baseline: 78 + i * 0.3,
      projected: 78 + i * 0.3 + (outcomes.placementRate - 78) * (i / 11),
    })), [outcomes.placementRate])

  const presets = [
    { label: 'Attendance +10%', changes: { attendance: 10 } },
    { label: 'AI & Cloud Curriculum', changes: { courses: 3, certifications: 4 } },
    { label: 'Industry Partnerships Boost', changes: { partnerships: 8, faculty: 3 } },
  ]

  return (
    <div>
      <PageHeader
        title="College Future Simulator"
        subtitle="Flagship AI simulation environment — modify parameters and see instant predicted outcomes"
        action={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-purple-400">
            <FlaskConical className="w-3 h-3" /> Simulation Lab
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 lg:col-span-1">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" /> Simulation Parameters
          </h3>
          <div className="space-y-5">
            {SIMULATION_PARAMS.map((param) => (
              <div key={param.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">{param.label}</span>
                  <span className="text-purple-400 font-mono">+{params[param.id]}{param.unit}</span>
                </div>
                <input
                  type="range" min={0} max={param.max} value={params[param.id]}
                  onChange={(e) => setParams({ ...params, [param.id]: parseInt(e.target.value) })}
                  className="w-full accent-purple-500"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-xs text-slate-500 mb-2">Quick Presets</p>
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setParams({ attendance: 0, courses: 0, faculty: 0, partnerships: 0, certifications: 0, ...preset.changes })}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 bg-white/5 hover:bg-purple-500/10 hover:text-purple-400 transition-colors border border-transparent hover:border-purple-500/20"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Pass Rate', value: `${outcomes.passRate.toFixed(1)}%`, change: `+${(outcomes.passRate - 84).toFixed(1)}%`, color: 'text-emerald-400' },
              { label: 'Placement Rate', value: `${outcomes.placementRate.toFixed(1)}%`, change: `+${(outcomes.placementRate - 78).toFixed(1)}%`, color: 'text-cyan-400' },
              { label: 'Dropout Risk', value: `${outcomes.dropoutRisk.toFixed(1)}%`, change: `${outcomes.dropoutRisk < 12 ? '' : '+'}${(outcomes.dropoutRisk - 12).toFixed(1)}%`, color: 'text-red-400' },
              { label: 'Placement Readiness', value: `${outcomes.readiness.toFixed(0)}%`, change: `+${(outcomes.readiness - 72).toFixed(0)}%`, color: 'text-purple-400' },
              { label: 'Average Salary', value: `₹${outcomes.avgSalary.toFixed(1)}L`, change: `+${((outcomes.avgSalary - 6.8) / 6.8 * 100).toFixed(0)}%`, color: 'text-amber-400' },
              { label: 'Skill Index', value: `${Math.min(99, outcomes.readiness + 5).toFixed(0)}%`, change: '+boost', color: 'text-pink-400' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-4 text-center">
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className={`text-2xl font-bold ${item.color} mt-1`}>{item.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.change}</p>
              </div>
            ))}
          </div>

          <ChartCard title="Placement Rate Projection" subtitle="Baseline vs simulated trajectory over 12 months">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="simGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[70, 95]} />
                <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(139,92,246,0.3)' }} />
                <Area type="monotone" dataKey="baseline" stroke="#64748b" fill="transparent" strokeDasharray="5 5" name="Baseline" />
                <Area type="monotone" dataKey="projected" stroke="#8b5cf6" fill="url(#simGrad)" name="Simulated" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {(params.attendance >= 10 || params.courses >= 3) && (
            <div className="glass rounded-xl p-5 border border-purple-500/20">
              <p className="text-sm font-medium text-purple-400 mb-2">Simulation Result</p>
              {params.attendance >= 10 && (
                <p className="text-sm text-slate-300">
                  <span className="text-white font-semibold">Attendance +{params.attendance}%</span> → Pass Rate +{(params.attendance * 0.8).toFixed(0)}%, Placement Rate +{(params.attendance * 0.5).toFixed(0)}%, Dropout Risk -{(params.attendance * 1.2).toFixed(0)}%
                </p>
              )}
              {(params.courses >= 3 || params.certifications >= 2) && (
                <p className="text-sm text-slate-300 mt-2">
                  <span className="text-white font-semibold">New Curriculum Introduced</span> → Placement Readiness +{((params.courses * 2.5 + params.certifications * 3)).toFixed(0)}%, Average Salary +{((params.courses * 0.1 + params.certifications * 0.2) / 6.8 * 100).toFixed(0)}%
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
