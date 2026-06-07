import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { FACULTY_LIST } from '../data/sampleData'

export function Faculty() {
  return (
    <div>
      <PageHeader title="Faculty" subtitle="100 faculty digital twins with AI performance metrics" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FACULTY_LIST.map((faculty) => (
          <Link
            key={faculty.id}
            to="/faculty/FAC001"
            className="glass rounded-xl p-5 hover:border-cyan-500/30 transition-all hover:scale-[1.01] group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center text-sm font-bold text-amber-400">
                {faculty.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{faculty.name}</p>
                <p className="text-xs text-slate-500">{faculty.designation}</p>
              </div>
            </div>
            <p className="text-xs text-cyan-400 mb-3">{faculty.department}</p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-slate-500 text-xs">Effectiveness</p>
                <p className="text-white font-mono">{faculty.effectiveness}%</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Students</p>
                <p className="text-white font-mono">{faculty.students}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
