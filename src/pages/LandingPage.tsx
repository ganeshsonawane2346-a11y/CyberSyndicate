import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Network, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react'
import { DigitalTwinMap } from '../components/3d/DigitalTwinMap'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17] overflow-hidden">
      <div className="fixed inset-0 grid-bg opacity-50" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center glow-cyan">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">EduTwin AI</span>
        </div>
        <Link to="/dashboard" className="px-5 py-2 rounded-lg glass text-sm text-cyan-400 hover:bg-cyan-500/10 transition-colors">
          Enter Platform
        </Link>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-cyan-400 mb-6">
            <Sparkles className="w-3 h-3" />
            Next-Generation AI Operating System for Colleges
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="gradient-text">Digital Twin</span>
            <br />
            <span className="text-white">College Ecosystem</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Predict placements, identify risks, bridge skill gaps, and simulate future outcomes
            with an AI-powered virtual replica of your entire college ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity glow-cyan"
            >
              Explore Platform
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/digital-twin"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-colors border border-purple-500/30"
            >
              <Network className="w-4 h-4" />
              View Digital Twin
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 glow-cyan">
            <DigitalTwinMap height="450px" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: TrendingUp, title: 'Predictive Analytics', desc: 'AI-powered placement forecasting with 94% accuracy' },
            { icon: Shield, title: 'Risk Detection', desc: 'Early identification of at-risk students and departments' },
            { icon: Zap, title: 'Future Simulation', desc: 'Model policy changes and see instant predicted outcomes' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { label: 'Students', value: '1,000' },
            { label: 'Faculty', value: '100' },
            { label: 'Departments', value: '8' },
            { label: 'Placement Rate', value: '78%' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
