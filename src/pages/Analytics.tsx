import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts'
import { PageHeader } from '../components/ui/PageHeader'
import { ChartCard } from '../components/ui/ChartCard'
import { CampusNetwork } from '../components/3d/CampusNetwork'
import {
  ATTENDANCE_ANALYTICS, DEPARTMENT_PERFORMANCE, PLACEMENT_TRENDS, RISK_DISTRIBUTION,
  SKILL_HEATMAP, FACULTY_LIST,
} from '../data/sampleData'

const TABS = ['Student Analytics', 'Faculty Analytics', 'Department Analytics', 'Placement Analytics', 'Skill Analytics', 'Digital Twin']

export function Analytics() {
  const [activeTab, setActiveTab] = useState(TABS[0])

  return (
    <div>
      <PageHeader title="Analytics Center" subtitle="Advanced dashboards with predictive trends & risk distribution" />

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === tab ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Student Analytics' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Attendance Analytics" subtitle="Monthly trends">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={ATTENDANCE_ANALYTICS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[70, 95]} />
                <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
                <Line type="monotone" dataKey="avg" stroke="#06b6d4" strokeWidth={2} name="Average" />
                <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Risk Distribution" subtitle="AI-classified student risk levels">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={RISK_DISTRIBUTION}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {RISK_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {activeTab === 'Faculty Analytics' && (
        <ChartCard title="Faculty Effectiveness Distribution" subtitle="Teaching effectiveness scores">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={FACULTY_LIST}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-30} textAnchor="end" height={80} />
              <YAxis stroke="#64748b" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Bar dataKey="effectiveness" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Effectiveness %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {activeTab === 'Department Analytics' && (
        <ChartCard title="Department Performance Comparison" subtitle="Multi-dimensional analysis">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={DEPARTMENT_PERFORMANCE}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Legend />
              <Bar dataKey="placement" fill="#06b6d4" name="Placement %" />
              <Bar dataKey="academic" fill="#8b5cf6" name="Academic Score" />
              <Bar dataKey="health" fill="#10b981" name="Health Score" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {activeTab === 'Placement Analytics' && (
        <ChartCard title="Prediction Trends" subtitle="Historical & forecasted placement rates">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={PLACEMENT_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Legend />
              <Line type="monotone" dataKey="rate" stroke="#06b6d4" strokeWidth={2} name="Placement Rate %" />
              <Line type="monotone" dataKey="salary" stroke="#ec4899" strokeWidth={2} name="Avg Salary (LPA)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {activeTab === 'Skill Analytics' && (
        <ChartCard title="Skill Supply vs Industry Demand" subtitle="Heat map analysis">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={SKILL_HEATMAP}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="skill" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Legend />
              <Bar dataKey="demand" fill="#ef4444" name="Industry Demand" radius={[4, 4, 0, 0]} />
              <Bar dataKey="supply" fill="#10b981" name="Student Supply" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {SKILL_HEATMAP.map((s) => {
              const gap = s.demand - s.supply
              const intensity = gap / s.demand
              return (
                <div key={s.skill} className="rounded-lg p-3 text-center text-xs" style={{ background: `rgba(239, 68, 68, ${intensity * 0.3})` }}>
                  <p className="text-white font-medium">{s.skill}</p>
                  <p className="text-red-400 mt-1">Gap: {gap}%</p>
                </div>
              )
            })}
          </div>
        </ChartCard>
      )}

      {activeTab === 'Digital Twin' && (
        <div>
          <ChartCard title="3D Campus Network Visualization" subtitle="Real-time glowing network of students, faculty, departments & placements">
            <CampusNetwork height="550px" />
          </ChartCard>
        </div>
      )}
    </div>
  )
}
