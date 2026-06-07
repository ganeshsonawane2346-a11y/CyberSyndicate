import { Link } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { STUDENTS } from '../data/sampleData'
import { cn } from '../lib/utils'

const riskColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
}

export function Students() {
  return (
    <div>
      <PageHeader title="Students" subtitle={`${STUDENTS.length}+ student digital twins in the ecosystem`} />

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input placeholder="Search by name, ID, department..." className="w-full pl-10 pr-4 py-2.5 rounded-lg glass text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm text-slate-400 hover:text-white">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-xs uppercase">
              <th className="text-left p-4">Student</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">CGPA</th>
              <th className="text-left p-4">Attendance</th>
              <th className="text-left p-4">Risk</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((student) => (
              <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <Link to={`/students/${student.id}`} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-xs font-bold text-cyan-400">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-cyan-400 transition-colors">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.id}</p>
                    </div>
                  </Link>
                </td>
                <td className="p-4 text-slate-300">{student.department}</td>
                <td className="p-4 font-mono text-white">{student.cgpa}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-cyan-500" style={{ width: `${student.attendance}%` }} />
                    </div>
                    <span className="text-slate-400">{student.attendance}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={cn('px-2 py-0.5 rounded-full text-xs border capitalize', riskColors[student.riskLevel as keyof typeof riskColors])}>
                    {student.riskLevel}
                  </span>
                </td>
                <td className="p-4">
                  <span className={cn('text-xs', student.placementReady ? 'text-emerald-400' : 'text-amber-400')}>
                    {student.placementReady ? 'Placement Ready' : 'In Progress'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
