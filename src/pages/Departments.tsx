import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { DEPARTMENTS } from '../data/sampleData'
import { cn, healthColors } from '../lib/utils'

export function Departments() {
  return (
    <div>
      <PageHeader title="Departments" subtitle="8 department digital twins with health monitoring" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEPARTMENTS.map((dept) => {
          const colors = healthColors[dept.status === 'healthy' ? 'green' : dept.status === 'warning' ? 'yellow' : 'red']
          return (
            <Link
              key={dept.id}
              to={`/departments/${dept.id}`}
              className={cn('glass rounded-xl p-5 hover:scale-[1.02] transition-all border', colors.border, colors.bg)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={cn('w-3 h-3 rounded-full', dept.status === 'healthy' ? 'bg-emerald-500' : dept.status === 'warning' ? 'bg-amber-500' : 'bg-red-500')} />
                <span className={cn('text-xs font-medium capitalize', colors.text)}>{dept.status}</span>
              </div>
              <h3 className="font-semibold text-white mb-1">{dept.name}</h3>
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div><p className="text-slate-500">Students</p><p className="text-white font-mono">{dept.students}</p></div>
                <div><p className="text-slate-500">Faculty</p><p className="text-white font-mono">{dept.faculty}</p></div>
                <div><p className="text-slate-500">Health</p><p className={cn('font-mono', colors.text)}>{dept.healthScore}%</p></div>
                <div><p className="text-slate-500">Placement</p><p className="text-white font-mono">{dept.placementRate}%</p></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
