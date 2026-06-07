import { Shield, Server, Activity, Lock } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { KPICard } from '../components/ui/KPICard'
import { InsightPanel } from '../components/ui/InsightPanel'
import { COLLEGE_STATS, AI_INSIGHTS } from '../data/sampleData'

export function SuperAdmin() {
  return (
    <div>
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="System-wide control panel for the entire digital twin ecosystem"
        action={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 text-xs text-purple-400 border border-purple-500/30">
            <Shield className="w-3 h-3" /> Super Admin
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="System Uptime" value="99.97%" icon={Server} color="green" />
        <KPICard title="Active Sessions" value="342" icon={Activity} color="cyan" />
        <KPICard title="API Calls Today" value="48.2K" icon={Activity} color="purple" />
        <KPICard title="Security Score" value="96%" icon={Lock} color="green" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <InsightPanel insights={AI_INSIGHTS} />
        <div className="glass rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Platform Overview</h3>
          <div className="space-y-4">
            {[
              { label: 'Total Students Monitored', value: COLLEGE_STATS.totalStudents },
              { label: 'At-Risk Students', value: COLLEGE_STATS.atRiskStudents },
              { label: 'Skill Gap Students', value: COLLEGE_STATS.skillGapStudents },
              { label: 'Predicted Placement Rate', value: `${COLLEGE_STATS.predictedPlacementRate}%` },
              { label: 'AI Models Active', value: '12' },
              { label: 'Digital Twins Synced', value: '1,108' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-slate-400">{item.label}</span>
                <span className="text-sm font-mono text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">System Logs</h3>
        <div className="font-mono text-xs space-y-2 text-slate-400">
          <p><span className="text-emerald-400">[OK]</span> Digital twin sync completed — 1,108 entities updated</p>
          <p><span className="text-cyan-400">[INFO]</span> Placement prediction model retrained — accuracy 94.2%</p>
          <p><span className="text-amber-400">[WARN]</span> 120 students flagged for intervention — EEE department</p>
          <p><span className="text-emerald-400">[OK]</span> Simulation engine ready — 5 scenarios loaded</p>
          <p><span className="text-cyan-400">[INFO]</span> AI Assistant processed 1,247 queries today</p>
        </div>
      </div>
    </div>
  )
}
