import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PageHeader } from '../components/ui/PageHeader'
import { ChartCard } from '../components/ui/ChartCard'
import { ScoreRing } from '../components/ui/ScoreRing'
import { DEPARTMENTS } from '../data/sampleData'
import { cn, healthColors } from '../lib/utils'

export function DepartmentDetail() {
  const { id } = useParams()
  const dept = DEPARTMENTS.find((d) => d.id === id) || DEPARTMENTS[0]
  const colors = healthColors[dept.status === 'healthy' ? 'green' : dept.status === 'warning' ? 'yellow' : 'red']

  const perfData = [
    { metric: 'Placement', value: dept.placementRate },
    { metric: 'Academic', value: dept.avgCGPA * 10 },
    { metric: 'Research', value: dept.research * 3 },
    { metric: 'Health', value: dept.healthScore },
  ]

  return (
    <div>
      <Link to="/departments" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-400 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Departments
      </Link>

      <PageHeader title={`${dept.name} Digital Twin`} subtitle="Department health, performance & predictions" />

      <div className="grid lg:grid-cols-4 gap-4 mb-6">
        <div className={cn('glass rounded-xl p-5 border', colors.border, colors.bg)}>
          <p className="text-xs text-slate-400">Health Score</p>
          <p className={cn('text-3xl font-bold', colors.text)}>{dept.healthScore}%</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-slate-400">Placement Rate</p>
          <p className="text-3xl font-bold text-white">{dept.placementRate}%</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-slate-400">Avg CGPA</p>
          <p className="text-3xl font-bold text-white">{dept.avgCGPA}</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-slate-400">Research Papers</p>
          <p className="text-3xl font-bold text-white">{dept.research}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Department Performance" subtitle="Key metrics overview">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={perfData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="metric" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="glass rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">AI Predictions</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
              <span className="text-sm text-slate-400">Expected Placement Rate Next Year</span>
              <span className="text-lg font-bold text-emerald-400">{dept.placementRate + 4}%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
              <span className="text-sm text-slate-400">Expected Academic Performance</span>
              <span className="text-lg font-bold text-cyan-400">+{(dept.avgCGPA * 0.05).toFixed(1)} CGPA</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
              <span className="text-sm text-slate-400">Future Enrollment Trend</span>
              <span className="text-lg font-bold text-purple-400">+{Math.floor(dept.students * 0.08)} students</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <ScoreRing score={dept.placementRate} label="Placement Stats" color="#10b981" />
        <ScoreRing score={Math.floor(dept.avgCGPA * 10)} label="Student Performance" color="#06b6d4" />
        <ScoreRing score={75} label="Faculty Performance" color="#f59e0b" />
        <ScoreRing score={dept.research * 3} label="Research Activity" color="#8b5cf6" />
      </div>
    </div>
  )
}
