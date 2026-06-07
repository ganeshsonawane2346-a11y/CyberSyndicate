import { Settings as SettingsIcon, Bell, Shield, Database, Palette } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

export function Settings() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure your EduTwin AI platform" />

      <div className="grid lg:grid-cols-2 gap-6">
        {[
          { icon: Database, title: 'Data Sources', desc: 'Connect ERP, LMS, and placement portals', items: ['ERP Integration', 'LMS Sync', 'Placement Portal API'] },
          { icon: Bell, title: 'Notifications', desc: 'Alert preferences for risk detection', items: ['Email Alerts', 'SMS Notifications', 'Dashboard Alerts'] },
          { icon: Shield, title: 'Security', desc: 'Access control and authentication', items: ['Two-Factor Auth', 'Role-Based Access', 'Audit Logs'] },
          { icon: Palette, title: 'Appearance', desc: 'Customize dashboard theme', items: ['Dark Mode', 'Accent Color', 'Compact View'] },
        ].map((section) => (
          <div key={section.title} className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">{section.title}</h3>
                <p className="text-xs text-slate-500">{section.desc}</p>
              </div>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-slate-300">{item}</span>
                  <div className="w-10 h-5 rounded-full bg-cyan-500/30 relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-cyan-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-6 mt-6 flex items-center gap-4">
        <SettingsIcon className="w-8 h-8 text-slate-500" />
        <div>
          <p className="text-sm text-white">EduTwin AI v1.0.0</p>
          <p className="text-xs text-slate-500">College Digital Twin Platform — Hackathon Demo Edition</p>
        </div>
      </div>
    </div>
  )
}
