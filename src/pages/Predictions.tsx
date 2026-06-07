import { useState } from 'react'
import { Brain, AlertTriangle, BookOpen, Target } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { ChartCard } from '../components/ui/ChartCard'

export function Predictions() {
  const [placementInputs, setPlacementInputs] = useState({ cgpa: 8.2, attendance: 87, projects: 5, certifications: 4, dsa: 75, communication: 82 })
  const [backlogInputs, setBacklogInputs] = useState({ attendance: 72, assignments: 65, midterm: 58, prerequisites: 70 })
  const [dropoutInputs, setDropoutInputs] = useState({ attendance: 75, cgpa: 6.8, engagement: 60, financial: 40 })
  const [skillInputs, setSkillInputs] = useState({ python: 85, java: 78, react: 65, aws: 30, dsa: 55 })

  const placementProb = Math.min(98, Math.round(
    placementInputs.cgpa * 8 + placementInputs.attendance * 0.15 +
    placementInputs.projects * 3 + placementInputs.certifications * 2 +
    placementInputs.dsa * 0.1 + placementInputs.communication * 0.08
  ))

  const expectedSalary = (placementProb / 100 * 9 + 1).toFixed(1)
  const backlogRisk = Math.min(95, Math.round(100 - (backlogInputs.attendance * 0.3 + backlogInputs.assignments * 0.25 + backlogInputs.midterm * 0.3 + backlogInputs.prerequisites * 0.15)))
  const dropoutRisk = Math.min(95, Math.round(100 - (dropoutInputs.attendance * 0.25 + dropoutInputs.cgpa * 8 + dropoutInputs.engagement * 0.2 + (100 - dropoutInputs.financial) * 0.15)))

  const industryDemand = { 'Cloud Computing': 92, 'System Design': 95, 'Advanced DSA': 90, 'DevOps': 82, 'ML/AI': 88 }
  const currentSkills = { 'Cloud Computing': skillInputs.aws, 'System Design': 25, 'Advanced DSA': skillInputs.dsa, 'DevOps': 28, 'ML/AI': 48 }
  const missingSkills = Object.entries(industryDemand).filter(([skill, demand]) => (currentSkills[skill as keyof typeof currentSkills] || 0) < demand * 0.7)

  return (
    <div>
      <PageHeader title="AI Prediction Engine" subtitle="Multi-model predictive analytics for placements, backlogs, dropout & skills" />

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-xl p-6 border border-cyan-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white">Placement Predictor</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(placementInputs).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400 capitalize">{key === 'dsa' ? 'DSA Score' : key}</span>
                  <span className="text-white font-mono">{val}{key === 'cgpa' ? '' : '%'}</span>
                </div>
                <input type="range" min={key === 'cgpa' ? 5 : key === 'projects' || key === 'certifications' ? 0 : 40} max={key === 'cgpa' ? 10 : key === 'projects' ? 10 : key === 'certifications' ? 8 : 100} step={key === 'cgpa' ? 0.1 : 1}
                  value={val} onChange={(e) => setPlacementInputs({ ...placementInputs, [key]: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-500" />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <p className="text-xs text-slate-400">Placement Probability</p>
            <p className="text-3xl font-bold gradient-text">{placementProb}%</p>
            <p className="text-sm text-white mt-2">Expected Salary: ₹{expectedSalary} LPA</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['TCS', 'Infosys', 'Accenture', placementProb > 80 ? 'Microsoft' : 'Wipro'].map(c => (
                <span key={c} className="px-2 py-0.5 rounded text-xs bg-white/10 text-cyan-400">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-white">Backlog Predictor</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(backlogInputs).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400 capitalize">{key === 'midterm' ? 'Mid-term Score' : key}</span>
                  <span className="text-white font-mono">{val}%</span>
                </div>
                <input type="range" min={30} max={100} value={val}
                  onChange={(e) => setBacklogInputs({ ...backlogInputs, [key]: parseInt(e.target.value) })}
                  className="w-full accent-amber-500" />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-slate-400">Subject Failure Probability</p>
            <p className="text-3xl font-bold text-amber-400">{backlogRisk}%</p>
            {backlogRisk > 50 && (
              <div className="mt-3 space-y-1">
                <p className="text-xs text-red-400">⚠ Low attendance in DBMS lectures</p>
                <p className="text-xs text-red-400">⚠ Failed 2 of 4 assignments</p>
                <p className="text-xs text-red-400">⚠ Weak prerequisite knowledge</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-red-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-white">Dropout Predictor</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(dropoutInputs).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400 capitalize">{key === 'cgpa' ? 'CGPA (x10)' : key === 'financial' ? 'Financial Stress' : key}</span>
                  <span className="text-white font-mono">{val}{key === 'cgpa' ? '' : '%'}</span>
                </div>
                <input type="range" min={20} max={100} value={val}
                  onChange={(e) => setDropoutInputs({ ...dropoutInputs, [key]: parseInt(e.target.value) })}
                  className="w-full accent-red-500" />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-slate-400">Dropout Risk Percentage</p>
            <p className="text-3xl font-bold text-red-400">{dropoutRisk}%</p>
            <div className="mt-3 space-y-1 text-xs text-slate-400">
              <p>Contributing Factors:</p>
              <p>• Attendance below 80% threshold</p>
              <p>• CGPA declining trend (-0.3/sem)</p>
              <p>• Low campus engagement score</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Skill Gap Predictor</h3>
          </div>
          <div className="space-y-4 mb-4">
            {Object.entries(skillInputs).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400 uppercase">{key}</span>
                  <span className="text-white font-mono">{val}%</span>
                </div>
                <input type="range" min={0} max={100} value={val}
                  onChange={(e) => setSkillInputs({ ...skillInputs, [key]: parseInt(e.target.value) })}
                  className="w-full accent-purple-500" />
              </div>
            ))}
          </div>
          <ChartCard title="" subtitle="">
            <p className="text-xs text-slate-400 mb-2">Missing Skills vs Industry Demand</p>
            {missingSkills.map(([skill, demand]) => (
              <div key={skill} className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-sm text-red-400">{skill}</span>
                <span className="text-xs text-slate-500">Demand: {demand}% · Current: {currentSkills[skill as keyof typeof currentSkills] || 0}%</span>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xs text-emerald-400 font-medium mb-2">Recommended Learning Path:</p>
              <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside">
                <li>Complete AWS Cloud Practitioner certification</li>
                <li>System Design course (8 weeks)</li>
                <li>Advanced DSA — 150 problems on LeetCode</li>
              </ol>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
