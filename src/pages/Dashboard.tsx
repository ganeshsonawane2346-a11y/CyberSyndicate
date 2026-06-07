import {
  GraduationCap, Users, Building2, Briefcase, Award, Target, AlertTriangle, HeartPulse,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { KPICard } from '../components/ui/KPICard'
import { ChartCard } from '../components/ui/ChartCard'
import { InsightPanel } from '../components/ui/InsightPanel'
import { PageHeader } from '../components/ui/PageHeader'
import { DigitalTwinMap } from '../components/3d/DigitalTwinMap'
import {
  COLLEGE_STATS, PLACEMENT_TRENDS, DEPARTMENT_PERFORMANCE, ATTENDANCE_ANALYTICS,
  RISK_DISTRIBUTION, AI_INSIGHTS,
} from '../data/sampleData'

export function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="Real-time overview of your college digital twin ecosystem"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Students" value={COLLEGE_STATS.totalStudents.toLocaleString()} icon={GraduationCap} trend={3.2} color="cyan" />
        <KPICard title="Total Faculty" value={COLLEGE_STATS.totalFaculty} icon={Users} trend={1.5} color="purple" />
        <KPICard title="Departments" value={COLLEGE_STATS.departments} icon={Building2} color="cyan" />
        <KPICard title="Placement Rate" value={`${COLLEGE_STATS.placementRate}%`} icon={Briefcase} trend={5.1} color="green" />
        <KPICard title="Average CGPA" value={COLLEGE_STATS.averageCGPA} icon={Award} trend={2.3} color="purple" />
        <KPICard title="Skill Readiness Index" value={`${COLLEGE_STATS.skillReadinessIndex}%`} icon={Target} trend={-1.2} color="amber" />
        <KPICard title="Dropout Risk" value={`${COLLEGE_STATS.dropoutRisk}%`} icon={AlertTriangle} trend={-2.8} color="red" />
        <KPICard title="Academic Health Score" value={`${COLLEGE_STATS.academicHealthScore}%`} icon={HeartPulse} trend={4.5} color="green" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ChartCard title="Digital Twin Map" subtitle="Interactive department health visualization">
            <div className="relative">
              <DigitalTwinMap height="350px" />
            </div>
          </ChartCard>
        </div>
        <InsightPanel insights={AI_INSIGHTS} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Placement Trends" subtitle="Year-over-year placement rate & salary">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={PLACEMENT_TRENDS}>
              <defs>
                <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Area type="monotone" dataKey="rate" stroke="#06b6d4" fill="url(#rateGrad)" name="Placement %" />
              <Area type="monotone" dataKey="salary" stroke="#8b5cf6" fill="transparent" name="Avg Salary (LPA)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Department Performance" subtitle="Placement & academic scores">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DEPARTMENT_PERFORMANCE}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Legend />
              <Bar dataKey="placement" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Placement %" />
              <Bar dataKey="health" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Health Score" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Attendance Analytics" subtitle="Monthly average vs target">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ATTENDANCE_ANALYTICS}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} domain={[70, 95]} />
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Area type="monotone" dataKey="avg" stroke="#10b981" fill="#10b98120" name="Average" />
              <Area type="monotone" dataKey="target" stroke="#f59e0b" fill="transparent" strokeDasharray="5 5" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Student Risk Distribution" subtitle="AI-classified risk levels">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={RISK_DISTRIBUTION} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                {RISK_DISTRIBUTION.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid rgba(6,182,212,0.3)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
