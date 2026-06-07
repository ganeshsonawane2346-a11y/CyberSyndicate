import { Link } from 'react-router-dom'
import { ArrowLeft, Code, Trophy, Award, MessageCircle } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { ChartCard } from '../components/ui/ChartCard'
import { ScoreRing } from '../components/ui/ScoreRing'
import { SAMPLE_STUDENT } from '../data/sampleData'

export function StudentProfile() {
  const s = SAMPLE_STUDENT

  return (
    <div>
      <Link to="/students" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-400 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Students
      </Link>

      <PageHeader
        title="Student Digital Twin"
        subtitle={`Complete AI-powered profile for ${s.name}`}
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="glass rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
              {s.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{s.name}</h2>
              <p className="text-sm text-slate-400">{s.rollNo}</p>
              <p className="text-xs text-cyan-400">{s.department} · {s.year}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="text-white">{s.email}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">CGPA</span><span className="text-white font-mono">{s.profile.cgpa}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Attendance</span><span className="text-white">{s.profile.attendance}%</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Projects</span><span className="text-white">{s.profile.projects}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Hackathons</span><span className="text-white">{s.profile.hackathons}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Certifications</span><span className="text-white">{s.profile.certifications}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Coding Activity</span><span className="text-white">{s.profile.codingActivity}%</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Communication</span><span className="text-white">{s.profile.communicationScore}%</span></div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-4">AI Scores</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <ScoreRing score={s.aiScores.academic} label="Academic" color="#06b6d4" />
            <ScoreRing score={s.aiScores.technical} label="Technical" color="#8b5cf6" />
            <ScoreRing score={s.aiScores.softSkill} label="Soft Skills" color="#10b981" />
            <ScoreRing score={s.aiScores.placementReadiness} label="Placement Ready" color="#ec4899" />
            <ScoreRing score={s.aiScores.backlogRisk} label="Backlog Risk" color="#f59e0b" />
            <ScoreRing score={s.aiScores.dropoutRisk} label="Dropout Risk" color="#ef4444" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="glass rounded-xl p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/30">
          <h3 className="text-sm font-semibold text-white mb-3">Placement Prediction</h3>
          <p className="text-4xl font-bold gradient-text mb-2">{s.prediction.placementProbability}%</p>
          <p className="text-sm text-slate-400 mb-4">Placement Probability</p>
          <p className="text-2xl font-bold text-white mb-1">₹{s.prediction.expectedSalary} LPA</p>
          <p className="text-xs text-slate-500 mb-4">Expected Salary</p>
          <div>
            <p className="text-xs text-slate-400 mb-2">Recommended Companies</p>
            <div className="flex flex-wrap gap-2">
              {s.prediction.recommendedCompanies.map((c) => (
                <span key={c} className="px-3 py-1 rounded-full text-xs bg-white/10 text-cyan-400 border border-cyan-500/20">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Code className="w-4 h-4 text-amber-400" /> Skill Gap Analysis
          </h3>
          <p className="text-xs text-slate-400 mb-3">Missing Skills</p>
          <div className="space-y-2 mb-4">
            {s.skillGaps.missing.map((skill) => (
              <div key={skill} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {skill}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mb-2">AI Recommendations</p>
          <ul className="space-y-1.5">
            {s.skillGaps.recommendations.map((rec) => (
              <li key={rec} className="text-sm text-emerald-400 flex items-start gap-2">
                <span className="text-emerald-500 mt-1">→</span> {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <ChartCard title="Projects" subtitle="">
            {s.projects.map((p) => (
              <div key={p.name} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.tech}</p>
                </div>
                <span className="text-sm font-mono text-cyan-400">{p.score}</span>
              </div>
            ))}
          </ChartCard>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ChartCard title="Hackathons" subtitle="">
          {s.hackathons.map((h) => (
            <div key={h.name} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
              <Trophy className="w-5 h-5 text-amber-400" />
              <div className="flex-1">
                <p className="text-sm text-white">{h.name}</p>
                <p className="text-xs text-slate-500">{h.rank} · {h.prize}</p>
              </div>
            </div>
          ))}
        </ChartCard>
        <ChartCard title="Certifications" subtitle="">
          {s.certifications.map((c) => (
            <div key={c} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white">{c}</span>
            </div>
          ))}
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
            <MessageCircle className="w-4 h-4" /> Communication Score: <span className="text-white font-mono">{s.profile.communicationScore}%</span>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
