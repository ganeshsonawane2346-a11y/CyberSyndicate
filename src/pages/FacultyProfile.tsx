import { Link } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { PageHeader } from '../components/ui/PageHeader'
import { ChartCard } from '../components/ui/ChartCard'
import { ScoreRing } from '../components/ui/ScoreRing'
import { SAMPLE_FACULTY } from '../data/sampleData'

export function FacultyProfile() {
  const f = SAMPLE_FACULTY
  const chartData = f.analytics.passRateTrend.map((rate, i) => ({
    semester: `S${i + 1}`,
    passRate: rate,
    feedback: f.analytics.feedbackTrend[i] * 20,
    improvement: f.analytics.studentGrowth[i],
  }))

  return (
    <div>
      <Link to="/faculty" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-400 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Faculty
      </Link>

      <PageHeader title="Faculty Digital Twin" subtitle={f.name} />

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl font-bold text-white">
              {f.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{f.name}</h2>
              <p className="text-sm text-amber-400">{f.designation}</p>
              <p className="text-xs text-slate-400">{f.department}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Student Feedback</span><span className="text-white flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{f.studentFeedback}/5</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Pass Percentage</span><span className="text-white font-mono">{f.passPercentage}%</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Course Completion</span><span className="text-white font-mono">{f.courseCompletionRate}%</span></div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-2">Courses Taught</p>
            <div className="flex flex-wrap gap-2">
              {f.coursesTaught.map((c) => (
                <span key={c} className="px-2 py-1 rounded text-xs bg-white/5 text-slate-300">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-4">AI Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ScoreRing score={f.aiMetrics.teachingEffectiveness} label="Teaching Effectiveness" color="#06b6d4" size="lg" />
            <ScoreRing score={f.aiMetrics.studentImprovement} label="Student Improvement" color="#10b981" size="lg" />
            <ScoreRing score={f.aiMetrics.facultyImpact} label="Faculty Impact" color="#8b5cf6" size="lg" />
            <ScoreRing score={f.aiMetrics.placementContribution} label="Placement Contribution" color="#ec4899" size="lg" />
          </div>
        </div>
      </div>

      <ChartCard title="Faculty Analytics" subtitle="Performance trends over semesters">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="semester" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
            <Legend />
            <Line type="monotone" dataKey="passRate" stroke="#06b6d4" strokeWidth={2} name="Pass Rate %" />
            <Line type="monotone" dataKey="feedback" stroke="#f59e0b" strokeWidth={2} name="Feedback Score" />
            <Line type="monotone" dataKey="improvement" stroke="#10b981" strokeWidth={2} name="Student Growth" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
