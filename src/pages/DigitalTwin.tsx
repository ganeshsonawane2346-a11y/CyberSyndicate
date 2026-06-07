import { PageHeader } from '../components/ui/PageHeader'
import { CampusNetwork } from '../components/3d/CampusNetwork'
import { DigitalTwinMap } from '../components/3d/DigitalTwinMap'
import { DEPARTMENTS, COLLEGE_STATS } from '../data/sampleData'
import { cn, healthColors } from '../lib/utils'

export function DigitalTwin() {
  return (
    <div>
      <PageHeader
        title="Digital Twin Map"
        subtitle="Interactive virtual replica of your entire college ecosystem"
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">3D Campus Network</h3>
            <CampusNetwork height="500px" />
          </div>
        </div>
        <div>
          <div className="glass rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-white mb-3">Department Nodes</h3>
            <div className="relative">
              <DigitalTwinMap height="280px" />
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Ecosystem Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Students</span><span className="text-emerald-400">{COLLEGE_STATS.totalStudents}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Faculty</span><span className="text-amber-400">{COLLEGE_STATS.totalFaculty}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Departments</span><span className="text-purple-400">{COLLEGE_STATS.departments}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Connections</span><span className="text-cyan-400">2,847</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Department Health Map</h3>
        <div className="grid md:grid-cols-4 gap-3">
          {DEPARTMENTS.map((dept) => {
            const colors = healthColors[dept.status === 'healthy' ? 'green' : dept.status === 'warning' ? 'yellow' : 'red']
            return (
              <div key={dept.id} className={cn('rounded-xl p-4 border transition-all hover:scale-105', colors.bg, colors.border)}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn('w-3 h-3 rounded-full animate-pulse', dept.status === 'healthy' ? 'bg-emerald-500' : dept.status === 'warning' ? 'bg-amber-500' : 'bg-red-500')} />
                  <span className={cn('text-xs font-medium', colors.text)}>{dept.status.toUpperCase()}</span>
                </div>
                <p className="text-sm font-semibold text-white">{dept.name}</p>
                <p className="text-xs text-slate-400 mt-1">Health: {dept.healthScore}% · Placement: {dept.placementRate}%</p>
              </div>
            )
          })}
        </div>
        <div className="flex gap-6 mt-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Green = Healthy</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Yellow = Warning</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Red = Critical</span>
        </div>
      </div>
    </div>
  )
}
