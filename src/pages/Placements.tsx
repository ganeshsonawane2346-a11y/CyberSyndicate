import { Briefcase, Building, TrendingUp, Users } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { PageHeader } from '../components/ui/PageHeader'
import { ChartCard } from '../components/ui/ChartCard'
import { KPICard } from '../components/ui/KPICard'
import { PLACEMENT_DATA, COMPANY_MATCHES } from '../data/sampleData'
import { cn } from '../lib/utils'

export function Placements() {
  return (
    <div>
      <PageHeader title="Placement Digital Twin" subtitle="Recruitment intelligence & company matching engine" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Placement Ready" value={PLACEMENT_DATA.readyStudents} icon={Users} subtitle={`of ${PLACEMENT_DATA.totalEligible} eligible`} color="green" />
        <KPICard title="Companies" value={PLACEMENT_DATA.companiesParticipating} icon={Building} color="cyan" />
        <KPICard title="Offers Made" value={PLACEMENT_DATA.offersMade} icon={Briefcase} trend={8.2} color="purple" />
        <KPICard title="Avg Salary" value={`₹${PLACEMENT_DATA.avgSalary}L`} icon={TrendingUp} trend={12.5} color="green" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Salary Trends" subtitle="Average & median packages over years">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={PLACEMENT_DATA.salaryTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Legend />
              <Line type="monotone" dataKey="avg" stroke="#06b6d4" strokeWidth={2} name="Average (LPA)" />
              <Line type="monotone" dataKey="median" stroke="#8b5cf6" strokeWidth={2} name="Median (LPA)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Recruiters" subtitle="Offers & average packages">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={PLACEMENT_DATA.topRecruiters} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={80} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Bar dataKey="offers" fill="#06b6d4" radius={[0, 4, 4, 0]} name="Offers" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Interactive Company Matching Engine</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPANY_MATCHES.map((match) => (
            <div key={match.company} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-white">{match.company}</h4>
                <span className={cn(
                  'px-2 py-0.5 rounded text-xs',
                  match.fit === 'Excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                  match.fit === 'Strong' ? 'bg-cyan-500/20 text-cyan-400' :
                  'bg-amber-500/20 text-amber-400'
                )}>{match.fit}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Match Score</span>
                  <span className="text-white font-mono">{match.matchScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Salary Range</span>
                  <span className="text-cyan-400">{match.salary}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 mt-2">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" style={{ width: `${match.matchScore}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="glass rounded-xl p-5 text-center">
          <p className="text-xs text-slate-400 mb-1">Placement Probability</p>
          <p className="text-3xl font-bold gradient-text">82%</p>
        </div>
        <div className="glass rounded-xl p-5 text-center">
          <p className="text-xs text-slate-400 mb-1">Salary Prediction</p>
          <p className="text-3xl font-bold text-white">₹7.5 LPA</p>
        </div>
        <div className="glass rounded-xl p-5 text-center">
          <p className="text-xs text-slate-400 mb-1">Highest Package</p>
          <p className="text-3xl font-bold text-emerald-400">₹{PLACEMENT_DATA.highestSalary} LPA</p>
        </div>
      </div>
    </div>
  )
}
