import { cn } from '../../lib/utils'

interface ScoreRingProps {
  score: number
  label: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function ScoreRing({ score, label, size = 'md', color = '#06b6d4' }: ScoreRingProps) {
  const sizes = { sm: 64, md: 80, lg: 100 }
  const dim = sizes[size]
  const stroke = 6
  const radius = (dim - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle cx={dim / 2} cy={dim / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold text-white', size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-sm')}>{score}</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 text-center">{label}</span>
    </div>
  )
}
